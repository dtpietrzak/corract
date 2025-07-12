import { RouteConfigItem } from '../_types'

export const useServerState = <
  AppRoute extends RouteConfigItem,
>(
  routeConfig: AppRoute,
): AppRoute['middleware'] => {
  if (typeof window === 'undefined') {
    return {
      title: '',
      meta: [],
      data: {},
    } as unknown as AppRoute['middleware']
  } else {
    const middlewareData = (routeConfig.middleware ?? []).map((middleware) => {
      return (
      // @ts-ignore
        window.__SSR_DATA__[middleware.name]
      )
    })

    return middlewareData as AppRoute['middleware']
  }
}
