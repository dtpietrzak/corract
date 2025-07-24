import type { PagesConfig } from 'src/types'
import isObject from 'isobject'

export const validatePagesConfig = (pagesConfig: PagesConfig): boolean => {
  if (!isObject(pagesConfig)) {
    throw new Error('"pages" must be a PagesConfig object! See app-def.ts')
  }

  for (const pagePath of Object.keys(pagesConfig)) {
    if (pagePath === '/') continue // skip root path validation

    if (typeof pagePath !== 'string') {
      throw new Error(`Invalid page: ${pagePath}. Page paths must be strings`)
    }
    if (!pagePath.startsWith('/')) {
      throw new Error(`Invalid page: ${pagePath}. Page paths must start with '/'`)
    }
    // throw if it has anything other than / - : or a-zA-Z0-9
    if (!(/^(?:\/(?:[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*|:[A-Za-z0-9]+))+$/).test(pagePath)) {
      throw new Error(`Invalid page: ${pagePath}. Page paths can only contain alphanumeric characters, slashes, and colons (for dynamic path parts).
        
good: /test                   - one static segment
good: /test-two               - static w/ dash
good: /really-any-number      - static w/ multiple dashes
good: /test/:id               - dynamic segment
good: /and-any/:combo/of-them - multiple dynamic segments

bad:  /user/:id-foo           - dynamic segment with dash
bad:  /user__/foo             - underscores are not allowed
bad:  /user//foo              - double slashes are not allowed
bad:  /user?name=foo          - query strings are not allowed in config

`)
    }
    // cant start with a number
    if ((/^\/\d/).test(pagePath)) {
      throw new Error(`Invalid page: ${pagePath}. Page paths cannot start with a number.`)
    }
  }

  return true
}
