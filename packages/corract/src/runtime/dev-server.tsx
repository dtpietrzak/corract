import 'esbuild-register/dist/node'

import { createServer } from 'vite'
import express from 'express'
import render from 'preact-render-to-string'

import {
  buildAppClient,
  buildPages,
  extendRouteConfig,
  registerRoutes,
} from '../routes'
import type { RouteConfig, StartCorractOptions } from '../_types'

export async function startDev(props: {
  options: StartCorractOptions<RouteConfig>;
}) {
  const server = express()

  const vite = await createServer({
    appType: 'custom',
    server: {
      middlewareMode: true,
    },
    optimizeDeps: {
      exclude: ['fsevents'],
    },
  })

  server.use(vite.middlewares)

  console.info('Using Vite config at:', vite.config.configFile, '\n')

  // compile each index.html entry point for each route
  // this will be used to serve the initial HTML for each route
  // and will also be used to build the app entry point
  // for the client-side routing
  // ...

  const clientHtml = render(props.options.client)

  registerRoutes({
    server: server,
    vite: vite,
    routeConfig: props.options.routeConfig,
    clientHtml: clientHtml,
  })

  const extendedRouteConfig = extendRouteConfig(props.options.routeConfig)

  if (process.argv.includes('--build')) {
    console.info('Building pages...')
    await buildPages({
      extendedRouteConfig: extendedRouteConfig,
    })
  }

  if (process.argv.includes('--build')) {
    await buildAppClient({
      extendedRouteConfig: extendedRouteConfig,
    })
  }

  server.listen(3000)
  console.info('Corract dev server running at http://localhost:3000')
}
