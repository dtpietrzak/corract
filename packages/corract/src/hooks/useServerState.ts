import type { MiddlewareFunction, RouteConfigItem } from '../_types'

export const useServerState = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  MW extends readonly MiddlewareFunction<any>[],
>(
  routeConfig: RouteConfigItem<MW>,
): {
  [I in keyof MW]: MW[I] extends MiddlewareFunction<infer Data>
    ? Data
    : never
} => {
  if (typeof window !== 'undefined' && routeConfig.middleware?.length) {
    return routeConfig.middleware.map((middleware) => {
      const middlewareResult = window.__SSR_DATA__?.[middleware.name]
      return middlewareResult?.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any
  } else {
    console.log('do we even get here?')
    throw new Error('useServerState can only be used in server-side rendered routes.')
  }
}
