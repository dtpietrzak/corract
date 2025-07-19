import 'esbuild-register/dist/node'

import { createServer } from 'vite'
import express from 'express'

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

  registerRoutes({
    server: server,
    vite: vite,
    options: props.options,
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
