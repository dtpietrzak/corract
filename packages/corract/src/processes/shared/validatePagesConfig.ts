import type { PagesConfig } from '_types'
import isObject from 'isobject'

export const validatePagesConfig = (pagesConfig: PagesConfig): boolean => {
  if (!isObject(pagesConfig)) {
    throw new Error('"pages" must be a PagesConfig object! See app-def.ts')
  }

  for (const routePath of Object.keys(pagesConfig)) {
    if (typeof routePath !== 'string' || !routePath.startsWith('/')) {
      throw new Error(`Invalid page: ${routePath}. Page routes must be strings starting with '/'`)
    }
  }

  return true
}
