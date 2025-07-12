import type { RouteConfig } from './routes/_types'

export type Mode = 'dev' | 'build' | 'start'

export type SetupCorractOptions<Routes extends RouteConfig> = {
  routeConfig: Routes;
  // optionally middleware, layout, etc.
}

export * from './routes/_types'
export * from './_types/superJson'
