import 'esbuild-register/dist/node'
import type { PagesConfig, StartCorractOptions } from 'src/types'

import { build as viteBuild } from 'vite'

import { extendPagesConfig, buildPages, buildAppClient } from 'src/processes/shared'
import { generateStaticHtml, mergeStaticHtmlToDist, cleanUp } from 'src/processes/build'

export async function startProdBuild(props: {
  options: StartCorractOptions<PagesConfig>;
}) {
  const extendedPagesConfig = extendPagesConfig(props.options.pages)

  await buildAppClient({
    extendedPagesConfig: extendedPagesConfig,
  })

  await buildPages({
    extendedPagesConfig: extendedPagesConfig,
  })

  await generateStaticHtml({
    options: props.options,
  })

  await viteBuild({
    appType: 'spa',

  })

  await mergeStaticHtmlToDist({
    options: props.options,
  })

  await cleanUp()

  console.info('Prod Build Complete')
}
