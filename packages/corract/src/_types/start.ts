import type { JSX } from 'preact'
import type { RouteConfig } from './routes'

export type Mode = 'dev' | 'build' | 'start'

export type StartCorractOptions<RC extends RouteConfig> = {
  routeConfig: RC;
  client: JSX.Element;
}
