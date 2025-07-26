import type { MiddlewareFunction, PageConfig, SuperJsonValue } from 'src/types'
import type { JSX } from 'preact'

import { createContext } from 'preact'
import { useContext, useEffect, useState } from 'preact/hooks'

type MiddlewareData = Record<string, SuperJsonValue>
type SsrStatus = 'initializing' | 'complete' | 'error'
type ServerStateContextType = MiddlewareData & {
  __SSR_STATUS__: SsrStatus;
}

const defaultValue: ServerStateContextType = {} as ServerStateContextType

const ServerStateContext = createContext(defaultValue)

export const useServerState = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  MW extends readonly MiddlewareFunction<any>[],
>(
  pageConfig: PageConfig<MW>,
): {
  [I in keyof MW]: MW[I] extends MiddlewareFunction<infer Data>
    ? Data
    : never
} => {
  const context = useContext(ServerStateContext)

  if (!pageConfig.middleware || pageConfig.middleware.length === 0) {
    console.error('You\'re trying to use `useServerState` without any middleware defined for the route in the route config - app-def.ts')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return [] as any
  }

  return pageConfig.middleware.map((middleware) => {
    const middlewareResult = context[middleware.name] as { data: unknown }
    if (!middlewareResult) throw new Error(`No middleware result found for ${middleware.name} in the server state context: ${JSON.stringify(context)}`)
    return middlewareResult?.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any
}

export type ServerStateProviderProps = {
  children: JSX.Element;
  currentPath?: string;
  middlewareData?: MiddlewareData;
}

let previousRoute: string | undefined

export const ServerStateProvider = (props: ServerStateProviderProps) => {
  const initialStatus: SsrStatus = props.middlewareData
    ? 'complete'
    : 'initializing'
  const initialState: MiddlewareData = typeof window !== 'undefined'
    ? window.__SSR_DATA__ || {}
    : props.middlewareData || {}

  const [ssrState, setSsrState] = useState<MiddlewareData>(initialState)
  const [ssrStatus, setSsrStatus] = useState<SsrStatus>(initialStatus)

  useEffect(() => {
    document.getElementById('dry-app')?.remove()
    setSsrStatus('complete')
  }, [])

  useEffect(() => {
    if (!props.currentPath) return
    if (!previousRoute) {
      previousRoute = props.currentPath
      return
    }
    // get the current base url of the window to use the path
    const baseUrl = window.location.origin

    fetch(`${baseUrl}${props.currentPath}`, {
      headers: {
        'X-Client-App-Request': 'true',
      },
    }).then((res) => {
      if (!res.ok) {
        console.error('Failed to fetch middleware data:', res.statusText)
        setSsrStatus('error')
        return
      }
      return res.json()
    })
      .then((data) => {
        setSsrState((prev) => ({
          ...prev,
          ...data,
        }))
      })

    previousRoute = props.currentPath
  }, [props.currentPath])

  return (
    <ServerStateContext.Provider
      value={{
        ...ssrState,
        __SSR_STATUS__: ssrStatus,
      }}
    >
      {
        ssrStatus === 'complete' &&
        props.children
      }
    </ServerStateContext.Provider>
  )
}
