import type { PagesConfig, StartCorractOptions } from 'src/types'

import fs from 'node:fs/promises'
import path from 'node:path'
import render from 'preact-render-to-string'
import { Project, Type as TsMorphType } from 'ts-morph'

export const generateStaticHtml = async(props: {
  options: StartCorractOptions<PagesConfig>;
}): Promise<void> => {
  // this might cause a bug down the road. I'm not sure if it's supposed to
// be the one in the app or the one in the corract package
  const project = new Project({
    tsConfigFilePath: './tsconfig.json',
  })

  const baseHtml = await fs.readFile(path.resolve('index.html'), 'utf-8')

  const tsAst_pagesConfig = project
    .addSourceFileAtPath(path.resolve('src/app-def.ts'))
    .getVariableDeclaration('pages')

  if (!tsAst_pagesConfig) {
    throw new Error('Could not find pages config variable declaration in app-def.ts, it must be named "pages"')
  }

  let tsAst_declarations: Record<string, unknown> = {}

  tsAst_pagesConfig
    .getType()
    .getProperties()
    .forEach((prop) => {
      tsAst_declarations[prop.getName()] = prop
        .getDeclarations()[0]
        .getType()
        .getProperties()
        .map((prop) => {
          if (prop.getName() === 'middleware') {
            const middleware = prop
              .getDeclarations()[0]
              .getType()

            return middleware.getTupleElements().map((p) => {
              return p.getCallSignatures()[0]
                .getReturnType()
                .getTypeArguments()[0]
                .getProperties().map((_p) => {
                  if (_p.getName() === 'data') {
                    return _p.getDeclarations()[0]
                      .getType()
                  } else {
                    return null
                  }
                })
                .filter(Boolean)![0]?.getText()
            })
          } else {
            return null
          }
        })
        .filter(Boolean)[0]
    })

  console.log(tsAst_declarations)
  throw new Error('expected exit')

  for (const pagePath of Object.keys(props.options.pages)) {
    console.info(`Transforming HTML for ${pagePath}`)


    const page = props.options.pages[pagePath]
    const middleware = page.middleware?.map((m) => {})

    const Client = props.options.client
    Client.props = {
      ssrPagePath: pagePath as keyof PagesConfig,
      middlewareData: {},
    }
    const clientHtml = render(Client)

    const script = `<script>window.__SSR_DATA__ = {};</script>`
    const dataInjected = baseHtml
      .replace('</body>', `${script}</body>`)
      .replace('<div id="dry-app">', `<div id="dry-app">${clientHtml}</div>`)

    fs.writeFile(path.join('.dist', `${pagePath}.html`), dataInjected)
  }
}
