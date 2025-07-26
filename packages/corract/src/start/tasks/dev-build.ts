import 'esbuild-register/dist/node'
import type { PagesConfig, StartCorractOptions } from 'src/types'

import { extendPagesConfig, buildPages, buildAppClient } from 'src/processes/shared'

export async function startDevBuild(props: {
  options: StartCorractOptions<PagesConfig>;
}) {
  const extendedPagesConfig = extendPagesConfig(props.options.pages)

  await buildAppClient({
    extendedPagesConfig: extendedPagesConfig,
  })

  await buildPages({
    extendedPagesConfig: extendedPagesConfig,
  })

  console.info('Dev Build Complete')
}
