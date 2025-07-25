import type { Express, NextFunction, RequestHandler, Response } from 'express'
import type { CorractRequest, PagesConfig, StartCorractOptions } from 'src/types'

import fs from 'node:fs/promises'
import path from 'node:path'
import render from 'preact-render-to-string'

export const registerPagesToExpressProd = async(props: {
  server: Express;
  options: StartCorractOptions<PagesConfig>;
}): Promise<void> => {
  for (const pagePath of Object.keys(props.options.pages)) {
    const pageConfig = props.options.pages[pagePath]

    // Destructure middleware or use empty array if none
    const middlewares = pageConfig.middleware || []
    const middlewareFunctions: RequestHandler[] = middlewares.map((middleware) => {
      return async(req: CorractRequest, res: Response, next: NextFunction) => {
        try {
          // Call the middleware function and get derived data
          const middlewareResult = await middleware({
            req: req,
            res: res,
          })
          // Attach the derived data to the request object
          if (!req.__SSR_DATA__) req.__SSR_DATA__ = {}
          req.__SSR_DATA__[middleware.name] = middlewareResult
          next()
        } catch(error) {
          // Handle any errors from the middleware
          console.error(`Error in middleware for ${req.url}: ${error}`)
          res.status(500).send('Internal Server Error')
        }
      }
    })

    // Compose the final handler
    const handler = async(req: CorractRequest, res: Response) => {
      if (req.header('X-Client-App-Request') === 'true') {
        // If this is a client app request, just return the SSR data
        res.json(req.__SSR_DATA__)
        return
      }

      const pageHtml = await fs.readFile(path.resolve(
        '.dist',
        'static-html',
        `${pagePath !== '/' ? pagePath : 'index'}.html`,
      ), 'utf-8')

      // const Client = props.options.client
      // Client.props = {
      //   ssrPagePath: pagePath as keyof PagesConfig,
      //   middlewareData: req.__SSR_DATA__,
      // }
      // const clientHtml = render(Client)

      // const data = req.__SSR_DATA__ || {}
      // const script = `<script>window.__SSR_DATA__ = ${
      //   JSON.stringify(data)
      // };</script>`
      // const dataInjected = pageHtml
      //   .replace('</body>', `${script}</body>`)
      //   .replace('<div id="dry-app">', `<div id="dry-app">${clientHtml}</div>`)

      res.send(pageHtml)
    }

    // Register route with middleware and handler
    props.server.get(pagePath, ...middlewareFunctions, handler)
  }
}
