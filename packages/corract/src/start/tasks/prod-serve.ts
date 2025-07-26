import 'esbuild-register/dist/node'
import type { PagesConfig, StartCorractOptions } from 'src/types'

import path from 'node:path'
import express from 'express'

import { startProdBuild } from './prod-build'
import { registerPagesToExpressProd } from 'src/processes/prod'

export async function startProdServe(props: {
  options: StartCorractOptions<PagesConfig>;
}) {
  await startProdBuild({
    options: props.options,
  })

  const server = express()

  server.use('/assets', express.static(path.resolve('.dist', 'assets')))

  await registerPagesToExpressProd({
    server: server,
    options: props.options,
  })

  if (!process.env.PORT) {
    console.warn('No PORT environment variable set, using port specified in config')
  }

  const port = process.env.PORT || props.options.port
  server.listen(port)
  console.info(`Corract prod server running at http://localhost:${port}`)
}
