/// <reference types="preact" />

export * from 'preact/jsx-runtime'
export * from './hooks'

import type { Response, NextFunction } from 'express'
import type { SetupCorractOptions, Mode, RouteConfig, MiddlewareFunction, CorractRequest } from './_types'
import { checkRoutes } from './routes'
import { runtimeDistributor } from './runtime/_distributor'

export const setupCorract = <Routes extends RouteConfig>(
  options: SetupCorractOptions<Routes>,
) => {

  const mode: Mode = process.env.CORRACT_MODE as Mode

  checkRoutes(options.routeConfig)
  console.info('Routes registered:', options.routeConfig)

  runtimeDistributor({
    mode: mode,
    routeConfig: options.routeConfig,
  })

  return options.routeConfig
}

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

export * from './_types'
