import type { JSX } from 'preact'
import type { RouteConfig, SuperJsonValue } from './_types'

export type Mode = 'dev' | 'build' | 'start'

export type ClientProps<RC extends RouteConfig = RouteConfig> = {
  ssrRoutePath?: keyof RC;
  middlewareData?: Record<string, SuperJsonValue>;
}

export type StartCorractOptions<RC extends RouteConfig> = {
  routeConfig: RC;
  client: JSX.Element;
}

export * from './routes/_types'
export * from './_types/superJson'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __SSR_DATA__?: any;
  }
}
