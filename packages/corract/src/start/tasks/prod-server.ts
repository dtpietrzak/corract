import 'esbuild-register/dist/node'
import type { PagesConfig, StartCorractOptions } from 'src/types'

import path from 'node:path'
import express from 'express'

// import { extendPagesConfig } from 'src/processes/shared'
import { registerPagesToExpressProd } from 'src/processes/prod'

export async function startProd(props: {
  options: StartCorractOptions<PagesConfig>;
}) {
  const server = express()

  server.use('/assets', express.static(path.resolve('.dist', 'assets')))

  await registerPagesToExpressProd({
    server: server,
    options: props.options,
  })

  // const extendedPagesConfig = extendPagesConfig(props.options.pages)

  server.listen(props.options.port)
  console.info(`Corract dev server running at http://localhost:${props.options.port}`)
}
