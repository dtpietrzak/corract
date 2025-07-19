import type { RouteConfig } from './routes/_types'

export type Mode = 'dev' | 'build' | 'start'

export type StartCorractOptions<Routes extends RouteConfig> = {
  routeConfig: Routes;
  client: preact.VNode;
}

export * from './routes/_types'
export * from './_types/superJson'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __SSR_DATA__?: any;
  }
}
