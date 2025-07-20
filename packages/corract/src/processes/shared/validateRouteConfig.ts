import type { RouteConfig } from '_types'
import isObject from 'isobject'

export const validateRouteConfig = (routeConfig: RouteConfig): boolean => {
  if (!isObject(routeConfig)) {
    throw new Error('Routes must be a RouteConfig object!')
  }

  for (const routePath of Object.keys(routeConfig)) {
    if (typeof routePath !== 'string' || !routePath.startsWith('/')) {
      throw new Error(`Invalid route: ${routePath}. Routes must be strings starting with '/'`)
    }
  }

  return true
}
