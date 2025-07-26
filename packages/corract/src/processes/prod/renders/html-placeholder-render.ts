import fs from 'node:fs/promises'
import path from 'node:path'
import { CorractRequest, MiddlewareResult } from 'src/types'

export const htmlPlaceholderRender = async(
  pagePath: string,
  __SSR_DATA__: CorractRequest['__SSR_DATA__'],
): Promise<string> => {
  if (!__SSR_DATA__) throw new Error('No SSR data provided for html placeholder render: ' + pagePath)

  const pageHtml = await fs.readFile(path.resolve(
    '.dist',
    'static-html',
    `${pagePath !== '/' ? pagePath.slice(1) : 'index'}.html`,
  ), 'utf-8')

  let dataInjectedHtml = pageHtml
  const replacements = generateMiddlewareTemplateMap(pagePath, __SSR_DATA__)
  Object.entries(replacements).forEach(([placeholder, replacement]) => {
    dataInjectedHtml = dataInjectedHtml.replace(new RegExp(placeholder, 'g'), replacement)
  })

  const finalHtml = pageHtml
    .replace('<script id="__CORRACT_SSR_DATA__">window.__SSR_DATA__={};</script>', `<script id="__CORRACT_SSR_DATA__">window.__SSR_DATA__=${JSON.stringify(__SSR_DATA__)};</script>`)
    .replace('<div id="dry-app">', `<div id="dry-app">${dataInjectedHtml}</div>`)

  return finalHtml
}

function generateMiddlewareTemplateMap(
  routePath: string,
  results: Record<string, MiddlewareResult>,
): Record<string, string> {
  const replacements: Record<string, string> = {}

  const walk = (
    value: unknown,
    middlewareFnName: string,
    path: string[] = [],
  ) => {
    const fullPath = `${middlewareFnName}.${path.join('.')}`
    const placeholder = `__SSR_%${routePath},${fullPath}%_SSR__`

    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean' ||
      value === null
    ) {
      replacements[placeholder] = String(value)
    } else if (Array.isArray(value)) {
      // optional: you could also index arrays here, e.g. someKey.0 etc
      value.forEach((item, i) => {
        walk(item, middlewareFnName, [...path, String(i)])
      })
    } else if (typeof value === 'object' && value !== null) {
      for (const key in value) {
        // @ts-ignore
        walk(value[key], middlewareFnName, [...path, key])
      }
    }
  }

  for (const middlewareFnName in results) {
    const data = results[middlewareFnName]?.data
    walk(data, middlewareFnName)
  }

  return replacements
}
