/// <reference types="preact" />

export type * from 'preact/jsx-runtime'

import type { StartCorractOptions, Mode, RouteConfig } from './_types'
import { checkRoutes } from './routes'
import { runtimeDistributor } from './runtime/_distributor'

let initialized = false

export const startCorract = <Routes extends RouteConfig>(
  options: StartCorractOptions<Routes>,
) => {
  if (initialized) {
    console.warn('Corract has already been initialized. Ignoring subsequent calls.')
    return options.routeConfig
  }
  initialized = true

  const mode: Mode = process.env.CORRACT_MODE as Mode

  checkRoutes(options.routeConfig)
  console.info('Routes registered:', options.routeConfig)

  runtimeDistributor({
    mode: mode,
    options: options,
  })

  return options.routeConfig
}
