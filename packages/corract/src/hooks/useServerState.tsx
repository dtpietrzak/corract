import type { MiddlewareFunction, RouteConfigItem, SuperJsonValue } from '../_types'
import type { JSX } from 'preact'

import { createContext } from 'preact'
import { useContext, useEffect, useState } from 'preact/hooks'

type SsrState = 'initializing' | 'complete' | 'error'
type ServerStateContextType = {
  [key: string]: unknown;
}

const defaultValue: ServerStateContextType = {} as ServerStateContextType

const ServerStateContext = createContext(defaultValue)

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
  const context = useContext(ServerStateContext)

  if (!routeConfig.middleware || routeConfig.middleware.length === 0) {
    console.error('You\'re trying to use `useServerState` without any middleware defined for the route in the route config - app-def.ts')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return [] as any
  }

  if (typeof window !== 'undefined') {
    return routeConfig.middleware.map((middleware) => {
      const middlewareResult = window.__SSR_DATA__?.[middleware.name]
      return middlewareResult?.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any
  } else { // Server-side rendering
    if (context.__SSR_STATE__ === 'complete') {
      return routeConfig.middleware.map((middleware) => {
        const middlewareResult = context[middleware.name] as { data: unknown }
        return middlewareResult?.data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return [] as any
    }
  }
}

export type ServerStateProviderProps = {
  children: JSX.Element;
  middlewareData?: Record<string, SuperJsonValue>;
}

export const ServerStateProvider = (props: ServerStateProviderProps) => {
  const initialState: SsrState = props.middlewareData
    ? 'complete'
    : 'initializing'
  const [ssrState, setSsrState] = useState(initialState)

  useEffect(() => {
    document.getElementById('dry-app')?.remove()
    setSsrState('complete')
  }, [])

  return (
    <ServerStateContext.Provider
      value={{
        ...props.middlewareData,
        __SSR_STATE__: ssrState,
      }}
    >
      {
        ssrState === 'complete' &&
        props.children
      }
    </ServerStateContext.Provider>
  )
}
