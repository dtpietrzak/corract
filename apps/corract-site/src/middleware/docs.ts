import type { MiddlewareProps } from 'corract'

const someMemoryStore = {
  calls: 0,
  lastCall: null as string | null,
}

export const docsMiddleware = async(props: MiddlewareProps) => {
  props.res.setHeader('X-Custom-Header', 'Corract Middleware')
  someMemoryStore.calls += 1
  someMemoryStore.lastCall = new Date().toISOString()

  return {
    meta: [],
    title: '',
    data: someMemoryStore,
  }
}
