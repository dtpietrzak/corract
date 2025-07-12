import 'esbuild-register/dist/node'

import { createServer } from 'vite'
import express from 'express'

import {
  buildAppEntry,
  buildPages,
  extendRouteConfig,
  registerRoutes,
} from '../routes'
import type { RouteConfig } from '../routes/_types'

export async function startDev(props: {
  routeConfig: RouteConfig;
}) {
  const app = express()

  const vite = await createServer({
    appType: 'custom',
    server: {
      middlewareMode: true,
    },
    optimizeDeps: {
      exclude: ['fsevents'],
    },
  })

  app.use(vite.middlewares)

  console.info('Using Vite config at:', vite.config.configFile, '\n')

  registerRoutes({
    app: app,
    vite: vite,
    routeConfig: props.routeConfig,
  })

  const extendedRouteConfig = extendRouteConfig(props.routeConfig)

  if (process.argv.includes('--build')) {
    console.info('Building pages...')
    await buildPages({
      extendedRouteConfig: extendedRouteConfig,
    })
  }

  if (process.argv.includes('--build')) {
    await buildAppEntry({
      extendedRouteConfig: extendedRouteConfig,
    })
  }

  app.listen(3000)
  console.info('Corract dev server running at http://localhost:3000')
}
