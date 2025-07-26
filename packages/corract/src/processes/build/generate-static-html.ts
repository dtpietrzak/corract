import type { PagesConfig, StartCorractOptions, SuperJsonValue } from 'src/types'

import path from 'node:path'
import { forceWriteFile } from '../_utils'

import render from 'preact-render-to-string'
import { Project, Type as TsMorphType, SyntaxKind } from 'ts-morph'

export const generateStaticHtml = async(props: {
  options: StartCorractOptions<PagesConfig>;
}): Promise<void> => {
  // this might cause a bug down the road. I'm not sure if it's supposed to
// be the one in the app or the one in the corract package
  const project = new Project({
    tsConfigFilePath: './tsconfig.json',
  })

  const tsAst_pagesConfig = project
    .addSourceFileAtPath(path.resolve('src/app-def.ts'))
    .getVariableDeclaration('pages')

  if (!tsAst_pagesConfig) {
    throw new Error('Could not find pages config variable declaration in app-def.ts, it must be named "pages"')
  }

  const middlewareTemplateMap: Record<string, Record<string, SuperJsonValue>> = {}

  tsAst_pagesConfig
    .getType()
    .getProperties()
    .forEach((routeProp) => {
      const routePath = routeProp.getName()

      const middlewareArray = routeProp
        .getDeclarations()[0]
        .getType()
        .getProperties()
        .find((p) => p.getName() === 'middleware')

      if (!middlewareArray) return

      const middlewareTupleType = middlewareArray
        .getDeclarations()[0]
        .getType()

      const middlewareMap: Record<string, SuperJsonValue> = {}

      middlewareTupleType.getTupleElements().forEach((tupleType) => {
        const callSignature = tupleType.getCallSignatures()[0]
        const returnType = callSignature?.getReturnType()

        const dataProp = returnType
          ?.getTypeArguments()?.[0] // unwrap Result<{ data }, E>
          ?.getProperties()
          .find((p) => p.getName() === 'data')

        if (!dataProp) return

        const dataType = dataProp.getDeclarations()[0].getType()

        const middlewareFnName = getMiddlewareName(tupleType)
        // const dataTypeName = getTypeName(dataType)
        const templateValues = getMiddlewareTemplateObject(
          routePath,
          middlewareFnName,
          '',
          dataType,
        )

        middlewareMap[middlewareFnName] = {
          data: templateValues,
        }
      })

      middlewareTemplateMap[routePath] = middlewareMap
    })

  for (const pagePath of Object.keys(props.options.pages)) {
    console.info(`Transforming HTML for ${pagePath}`)

    const Client = props.options.client
    Client.props = {
      ssrPagePath: pagePath as keyof PagesConfig,
      middlewareData: middlewareTemplateMap[pagePath],
    }
    const clientHtml = render(Client)

    forceWriteFile(path.join(
      '.dist-temp',
      `${pagePath !== '/' ? pagePath : '/index'}.txt`,
    ), clientHtml)
  }
}

function getMiddlewareTemplateObject(
  routePath: string,
  middlewareFnName: string,
  dataTypePath: string,
  type: TsMorphType,
  path: string = '',
): SuperJsonValue {
  const makePlaceholder = () => {
    return `__SSR_%${routePath},${middlewareFnName}.${path}%_SSR__`
  }

  if (type.isString()) return makePlaceholder()
  if (type.isNumber()) return makePlaceholder()
  if (type.isBoolean()) return makePlaceholder()
  if (type.isNull()) return makePlaceholder()
  if (type.isUndefined()) return makePlaceholder()
  if (type.isBigInt()) return makePlaceholder()
  if (type.getText() === 'Date') return makePlaceholder()
  if (type.getText() === 'RegExp') return makePlaceholder()
  if (type.getText().startsWith('Set<')) return [] // collapse Set to array
  if (type.getText().startsWith('Map<')) return {} // collapse Map to object
  if (type.isArray()) return []

  // Handle union types like `string | null`
  if (type.isUnion()) {
    const nonNullable = type.getUnionTypes().find((t) => !t.isNull() && !t.isUndefined())
    return nonNullable
      ? getMiddlewareTemplateObject(routePath, middlewareFnName, dataTypePath, nonNullable, path)
      : null
  }

  // Handle objects
  if (type.isObject() && type.getProperties().length > 0) {
    const obj: Record<string, SuperJsonValue> = {}
    for (const prop of type.getProperties()) {
      const propType = prop.getTypeAtLocation(prop.getDeclarations()[0])
      const nextPath = path ? `${path}.${prop.getName()}` : prop.getName()
      obj[prop.getName()] = getMiddlewareTemplateObject(
        routePath,
        middlewareFnName,
        dataTypePath,
        propType,
        nextPath,
      )
    }
    return obj
  }

  return null
}

function getMiddlewareName(type: TsMorphType): string {
  const symbol = type.getSymbol()
  if (symbol) {
    const name = symbol.getName()
    if (name !== '__function') return name
  }

  const decl = type.getSymbol()?.getDeclarations()?.[0]
  const varName = decl?.getFirstAncestorByKindOrThrow(SyntaxKind.VariableDeclaration)?.getName()

  if (!varName) throw new Error('All middleware functions must be named! No anonymous functions for middleware!')

  return varName
}
