import type { CorractRequest, StartCorractOptions, PagesConfig } from 'src/types'

import fs from 'node:fs/promises'
import path from 'node:path'
import { render } from 'preact-render-to-string'

export const runtimeRender = async(
  pagePath: string,
  __SSR_DATA__: CorractRequest['__SSR_DATA__'],
  client: StartCorractOptions<PagesConfig>['client'],
): Promise<string> => {
  if (!__SSR_DATA__) throw new Error('No SSR data provided for runtime render: ' + pagePath)

  const baseHtml = await fs.readFile(path.resolve('index.html'), 'utf-8')

  const Client = client
  Client.props = {
    ssrPagePath: pagePath as keyof PagesConfig,
    middlewareData: __SSR_DATA__,
  }
  const clientHtml = render(Client)

  const data = __SSR_DATA__ || {}
  const script = `<script id="__CORRACT_SSR_DATA__">window.__SSR_DATA__ = ${
    JSON.stringify(data)
  };</script>`
  const finalHtml = baseHtml
    .replace('</body>', `${script}</body>`)
    .replace('<div id="dry-app">', `<div id="dry-app">${clientHtml}</div>`)

  return finalHtml
}
