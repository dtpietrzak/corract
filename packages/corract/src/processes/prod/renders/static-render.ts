import fs from 'node:fs/promises'
import path from 'node:path'

export const staticRender = async(pagePath: string): Promise<string> => {
  const filePath = path.resolve(
    '.dist',
    'static-html',
    `${pagePath !== '/' ? pagePath.slice(1) : 'index'}.html`,
  )
  console.info(`Static rendering html file @: ${filePath}`)

  const pageHtml = await fs.readFile(filePath, 'utf-8')

  return pageHtml
}
