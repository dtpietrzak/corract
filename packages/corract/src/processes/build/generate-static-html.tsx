import type { PagesConfig, StartCorractOptions } from 'src/types'

import fs from 'node:fs/promises'
import path from 'node:path'
import render from 'preact-render-to-string'

export const generateStaticHtml = async(props: {
  options: StartCorractOptions<PagesConfig>;
}): Promise<void> => {
  const baseHtml = await fs.readFile(path.resolve('index.html'), 'utf-8')

  for (const pagePath of Object.keys(props.options.pages)) {
    console.info(`Transforming HTML for ${pagePath}`)

    const Client = props.options.client
    Client.props = {
      ssrPagePath: pagePath as keyof PagesConfig,
      middlewareData: {},
    }
    const clientHtml = render(Client)

    const script = `<script>window.__SSR_DATA__ = {};</script>`
    const dataInjected = baseHtml
      .replace('</body>', `${script}</body>`)
      .replace('<div id="dry-app">', `<div id="dry-app">${clientHtml}</div>`)

    fs.writeFile(path.join('.dist', `${pagePath}.html`), dataInjected)
  }
}
