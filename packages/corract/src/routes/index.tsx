import type { Express, NextFunction, RequestHandler, Response } from 'express'
import type { ViteDevServer } from 'vite'
import type { CorractRequest, PageConfig, PagesConfig, PagesConfigExtended } from '_types'
import type { StartCorractOptions } from '../_types'

import fs from 'node:fs/promises'
import path from 'node:path'
import render from 'preact-render-to-string'

export const registerRoutes = (props: {
  server: Express;
  vite: ViteDevServer;
  options: StartCorractOptions<PagesConfig>;
}): void => {
  for (const pagePath of Object.keys(props.options.pages)) {
    const pageConfig = props.options.pages[pagePath]

    // Destructure middleware or use empty array if none
    const middlewares = pageConfig.middleware || []
    const middlewareFunctions: RequestHandler[] = middlewares.map((middleware) => {
      return async(req: CorractRequest, res: Response, next: NextFunction) => {
        try {
          // Call the middleware function and get derived data
          const middlewareResult = await middleware({
            req: req,
            res: res,
          })
          // Attach the derived data to the request object
          if (!req.__SSR_DATA__) req.__SSR_DATA__ = {}
          req.__SSR_DATA__[middleware.name] = middlewareResult
          next()
        } catch(error) {
          // Handle any errors from the middleware
          props.vite.config.logger.error(`Error in middleware for ${req.url}: ${error}`)
          res.status(500).send('Internal Server Error')
        }
      }
    })

    // Compose the final handler
    const handler = async(req: CorractRequest, res: Response) => {
      if (req.header('X-Client-App-Request') === 'true') {
        // If this is a client app request, just return the SSR data
        res.json(req.__SSR_DATA__)
        return
      }

      props.vite.config.logger.info(`Transforming HTML for ${req.url}`)
      const baseHtml = await fs.readFile(path.resolve('index.html'), 'utf-8')

      const Client = props.options.client
      Client.props = {
        ssrPagePath: pageConfig as keyof PagesConfig,
        middlewareData: req.__SSR_DATA__,
      }
      const clientHtml = render(Client)

      const data = req.__SSR_DATA__ || {}
      const script = `<script>window.__SSR_DATA__ = ${
        JSON.stringify(data)
      };</script>`
      const dataInjected = baseHtml
        .replace('</body>', `${script}</body>`)
        .replace('<div id="dry-app">', `<div id="dry-app">${clientHtml}</div>`)

      const transformed = await props.vite.transformIndexHtml(
        req.url,
        dataInjected,
      )

      res.send(transformed)
    }

    // Register route with middleware and handler
    props.server.get(pagePath, ...middlewareFunctions, handler)
  }
}

export const extendPagesConfig = (pages: PagesConfig): PagesConfigExtended => {
  return Object.fromEntries(Object.entries(pages).map(([pagePath, config]) => {
    console.info(`Processing route: ${pagePath}`)
    const pathParts = pagePath.split('/')
    const forFilePath = pathParts.map((pathPart) => {
      if (pathPart.startsWith(':')) return `(${pathPart.slice(1)})`
      return pathPart
    }).join('/')
    const pageName = pathParts.map((pathPart) => {
      if (pathPart.startsWith(':')) return `_${pathPart.slice(1)}`
      return pathPart
    }).join('_')
    return [pagePath, {
      ...config,
      pageName: `Page${pageName}`,
      filePath: `./pages${forFilePath}`,
    }]
  }))
}

export const buildPages = async(props: {
  extendedPagesConfig: PagesConfigExtended;
}) => {
  await Promise.all(Object.keys(props.extendedPagesConfig).map(async(pagePath) => {
    const pathParts = pagePath.split('/')
    const sanitizedPath = pathParts.map((pathPart) => {
      if (pathPart.startsWith(':')) return `(${pathPart.slice(1)})`
      return pathPart
    }).join('/')
    // check if file already exists
    const filePath = `src/pages${sanitizedPath}/index.tsx`
    console.info(`Checking if file exists: ${filePath}`)

    if (await fileExists(filePath)) return
    console.info(`File does not exist, generating: ${filePath}`)

    // Ensure the directory exists
    const dirPath = `src/pages${sanitizedPath}`

    console.info(`Ensuring directory exists: ${dirPath}`)
    await fs.mkdir(dirPath, { recursive: true })
    console.info(`Generating page at: ${filePath}`)

    // Create the page template
    const pageTemplate = `import { Page } from 'corract'

export const MyPage: Page<'${pagePath}'> = (props) => {
  return (
    <>
      <h1>My Page</h1>
      <a href="/">Go Home</a>
    </>
  )
}

export default MyPage
`

    await fs.writeFile(filePath, pageTemplate)
  }))
}

type LayoutVariants = Record<string, {
  path: string;
  pageName: string;
  layoutName: string;
  nested: string;
}[]>[]

export const buildAppClient = async(props: {
  extendedPagesConfig: PagesConfigExtended;
}) => {
  const layoutVariants: LayoutVariants = []
  Object.entries(props.extendedPagesConfig).forEach(([pagePath, config]) => {
    if (!config.layouts?.length) {
      if (!layoutVariants[0]) layoutVariants[0] = {}
      const currentPaths = layoutVariants[0][''] || []
      currentPaths.push({ path: pagePath, pageName: config.pageName, nested: '', layoutName: '' })
      layoutVariants[0][''] = currentPaths
      return
    } else {
      if (!layoutVariants[0]) layoutVariants[0] = {}
      const currentPaths = layoutVariants[0][''] || []
      currentPaths.push({
        path: pagePath,
        pageName: config.pageName,
        layoutName: config.layouts[0].name,
        nested: config.layouts[0].name,
      })
      layoutVariants[0][''] = currentPaths
    }
    for (let i = 0; i < config.layouts?.length; i++) {
      if (!layoutVariants[i + 1]) layoutVariants[i + 1] = {}
      const nested = config.layouts[i + 1]
        ? `${config.layouts[i]?.name}_${config.layouts[i + 1]?.name}`
        : ''
      let currentLayout = config.layouts[i]?.name
      for (let j = 0; j < i; j++) {
        const previousLayout = config.layouts[j]?.name
        if (previousLayout) {
          currentLayout = `${previousLayout}_${currentLayout}`
        }
      }
      const currentPaths = layoutVariants[i + 1][currentLayout] || []
      currentPaths.push({
        path: pagePath,
        pageName: config.pageName,
        layoutName: config.layouts[i].name,
        nested: nested,
      })
      layoutVariants[i + 1][currentLayout] = currentPaths
    }
  })
  // an array of all the indiviudal layout components, unique array with no duplicates
  const layouts = Array.from(new Set(Object
    .values(props.extendedPagesConfig)
    .flatMap((config) => config.layouts || [])
    .map((layout) => layout.name))).map((name) => {
    return {
      name,
      filePath: `./layouts/${name}`,
    }
  })

  const pageImports = Object
    .values(props.extendedPagesConfig)
    .map((config) => `import ${config.pageName} from '${config.filePath}'`)
    .join('\n')

  const layoutImports = layouts
    .map((layout) => `import ${layout.name} from '${layout.filePath}'`)
    .join('\n')

  const routeString = (path: string, nested: string, pageName: string) => `<Route pages={pages} page={pages['${path}']} path={pathHandler('${path}')} component={${nested ? `_${nested}` : pageName}}/>`

  const jsx = layoutVariants.map((layoutVariant, i) => {
    if (i === 0) return `export function Client(props?: ClientProps) {
  ssrPagePath = props?.ssrPagePath as string | undefined
  const [currentRoute, setCurrentRoute] = useState<string | undefined>(ssrPagePath)

  return (
    <ServerStateProvider
      currentRoute={currentRoute}
      middlewareData={props?.middlewareData}
    >
      <Router onChange={(e) => setCurrentRoute(e.url)}>
        ${layoutVariants[0][''].map((layoutVariant) => routeString(layoutVariant.path, layoutVariant.nested, layoutVariant.pageName)).join('\n        ')}
      </Router>
    </ServerStateProvider>
  )
}`

    return `${Object.entries(layoutVariant).map(([currentLayout, layoutConfig]) => `function _${currentLayout}() {
  return (
    <${layoutConfig[0].layoutName}>
      <Router>
        ${layoutConfig.map((layoutConfigItem) => routeString(layoutConfigItem.path, layoutConfigItem.nested, layoutConfigItem.pageName)).join('\n        ')}
      </Router>
    </${layoutConfig[0].layoutName}>
  )
}`)
      .join('\n\n')}`

  }).join('\n\n')


  const content = `/**
 * NOTE: This file is auto-generated by Corract!
 * If you modify it, your changes will be lost on the next dev / build.
 *
 * - App Entry Point -
 *
 * This is the entry point for a Preact application.
 *
 * The current plan is to allow drivers to be set up to use this framework
 * with different ui libraries, routing libraries, state management, etc.
 */

import type { ClientProps } from 'corract'
import { render } from 'preact'
import { useState } from 'preact/hooks'
import { Router, Route } from 'preact-router'
import { ServerStateProvider } from 'corract'

import { pages } from './app-def'

${pageImports}
${layoutImports}

let ssrPagePath: string | undefined
const pathHandler = <T extends keyof typeof pages>(pagePath: T) => {
  if (ssrPagePath) {
    if (ssrPagePath === pagePath) {
      return '/' as typeof pagePath
    } else {
      return '/404' as unknown as typeof pagePath
    }
  } else {
    return pagePath
  }
}

${jsx}

if (typeof window !== 'undefined') {
  render(<Client/>, document.getElementById('app') as HTMLElement)
}
`

  // Write directly to the app's src/app-client.tsx
  await fs.writeFile('src/app-client.tsx', content)
  console.info('Generated src/app-client.tsx')
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await fs.access(path, fs.constants.F_OK)
    return true
  } catch {
    return false
  }
}
