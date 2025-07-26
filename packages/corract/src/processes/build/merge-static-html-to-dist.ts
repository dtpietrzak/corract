import type { PagesConfig, StartCorractOptions } from 'src/types'

import fs from 'node:fs/promises'
import path from 'node:path'
import { forceWriteFile } from '../_utils'

export const mergeStaticHtmlToDist = async(props: {
  options: StartCorractOptions<PagesConfig>;
}): Promise<void> => {
  const baseHtml = await fs.readFile(path.resolve('.dist/index.html'), 'utf-8')

  for (const pagePath of Object.keys(props.options.pages)) {
    console.info(`Finalizing HTML for ${pagePath}`)

    const precompiledPage = await fs.readFile(path.resolve(`.dist-temp/${pagePath !== '/' ? pagePath : 'index'}.txt`), 'utf-8')

    const script = `<script id="__CORRACT_SSR_DATA__">window.__SSR_DATA__={};</script>`
    const dataInjected = baseHtml
      .replace('</body>', `${script}</body>`)
      .replace('<div id="dry-app">', `<div id="dry-app">${precompiledPage}</div>`)

    forceWriteFile(path.join(
      '.dist/static-html',
      `${pagePath !== '/' ? pagePath : '/index'}.html`,
    ), dataInjected)
  }
}
