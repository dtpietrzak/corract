import type { PagesConfig, PagesConfigExtended } from 'src/types'

export const extendPagesConfig = (pages: PagesConfig): PagesConfigExtended => {
  return Object.fromEntries(Object.entries(pages).map(([pagePath, config]) => {
    console.info(`Processing route: ${pagePath}`)
    const pathParts = pagePath.split('/')
    const forFilePath = pathParts.map((pathPart) => {
      if (pathPart.startsWith(':')) return `[${pathPart.slice(1)}]`
      return pathPart
    }).join('/')
    const pageName = pathParts.map((pathPart) => {
      pathPart = pathPart.replace(/-/g, '__d__')
      if (pathPart.startsWith(':')) return `__x__${pathPart.slice(1)}`
      return pathPart
    }).join('_')
    return [pagePath, {
      ...config,
      pageName: `Page${pageName}`,
      filePath: `./pages${forFilePath}`,
    }]
  }))
}
