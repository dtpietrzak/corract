import 'esbuild-register/dist/node'
import type { PagesConfig, StartCorractOptions } from 'src/types'

import { createServer } from 'vite'
import express from 'express'

import { startDevBuild } from './dev-build'
import { registerPagesToExpressDev } from 'src/processes/dev'

export async function startDevServe(props: {
  options: StartCorractOptions<PagesConfig>;
}) {
  await startDevBuild({
    options: props.options,
  })

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
  console.info('Using Vite config at:', vite.config.configFile, '\n')

  server.use(vite.middlewares)

  await registerPagesToExpressDev({
    server: server,
    vite: vite,
    options: props.options,
  })

  const port = process.env.PORT || props.options.port
  server.listen(port)
  console.info(`Corract dev server running at http://localhost:${port}`)
}
