export * from './hooks'
export * from './types'

import type { Response, NextFunction } from 'express'
import type { MiddlewareFunction, CorractRequest } from './types'

export const middlewareHandler = async(
  req: CorractRequest,
  res: Response,
  next: NextFunction,
  middleware: MiddlewareFunction,
) => {
  const serverDerivedData = await middleware({
    req: req,
    res: res,
  })
  req.__SSR_DATA__ = serverDerivedData
  next()
}
