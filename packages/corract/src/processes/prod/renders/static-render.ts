import fs from 'node:fs/promises'
import path from 'node:path'

export const staticRender = async(pagePath: string): Promise<string> => {
  const pageHtml = await fs.readFile(path.resolve(
    '.dist',
    'static-html',
    `${pagePath !== '/' ? pagePath.slice(1) : 'index'}.html`,
  ), 'utf-8')

  return pageHtml
}
