import type { Express, NextFunction, RequestHandler, Response } from 'express'
import type { CorractRequest, PagesConfig, StartCorractOptions } from 'src/types'

import { staticRender } from './renders/static-render'
import { htmlPlaceholderRender } from './renders/html-placeholder-render'
import { runtimeRender } from './renders/runtime-render'

export const registerPagesToExpressProd = async(props: {
  server: Express;
  options: StartCorractOptions<PagesConfig>;
}): Promise<void> => {
  for (const pagePath of Object.keys(props.options.pages)) {
    const pageConfig = props.options.pages[pagePath]

    // Destructure middleware or use empty array if none
    const middlewares = pageConfig.middleware || []
    const middlewareFunctions: RequestHandler[] = middlewares.map((middleware) => {
      return async(
        req: CorractRequest,
        res: Response,
        next: NextFunction,
      ) => {
        try {
          if (!req.__MIDDLEWARE_LENGTH__) req.__MIDDLEWARE_LENGTH__ = 0
          req.__MIDDLEWARE_LENGTH__++
          // Call the middleware function and get derived data
          const middlewareResult = await middleware({
            req: req,
            res: res,
          })
          if (middlewareResult.runtimeRender) req.__RENDER_AT_RUNTIME__ = true
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
    const handler = async(
      req: CorractRequest,
      res: Response,
    ) => {
      if (req.header('X-Client-App-Request') === 'true') {
        // If this is a client app request, just return the SSR data
        res.json(req.__SSR_DATA__)
        return
      }

      if (
        !req.__SSR_DATA__ ||
        !req.__MIDDLEWARE_LENGTH__ ||
        req.__MIDDLEWARE_LENGTH__ === 0
      ) {
        const render = await staticRender(pagePath)
        res.send(render)
        return
      }

      if (!req.__RENDER_AT_RUNTIME__) {
        const render = await htmlPlaceholderRender(pagePath, req.__SSR_DATA__)
        res.send(render)
        return
      }

      // RUNTIME RENDER
      const render = await runtimeRender(
        pagePath,
        req.__SSR_DATA__,
        props.options.client,
      )
      res.send(render)
      return
    }

    // Register route with middleware and handler
    props.server.get(pagePath, ...middlewareFunctions, handler)
  }
}
