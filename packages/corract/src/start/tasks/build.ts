import 'esbuild-register/dist/node'
import type { PagesConfig, StartCorractOptions } from 'src/types'

import { extendPagesConfig, buildPages, buildAppClient } from 'src/processes/shared'
import { generateStaticHtml } from 'src/processes/build/generate-static-html'

export async function startBuild(props: {
  options: StartCorractOptions<PagesConfig>;
}) {
  const extendedPagesConfig = extendPagesConfig(props.options.pages)

  await buildPages({
    extendedPagesConfig: extendedPagesConfig,
  })

  await buildAppClient({
    extendedPagesConfig: extendedPagesConfig,
  })

  await generateStaticHtml({
    options: props.options,
  })

  console.log('build complete')
}
