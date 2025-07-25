import type { MiddlewareProps } from 'corract'

const someMemoryStore = {
  calls: 0,
  lastCall: null as string | null,
  currentRoutePath: null as string | null,
  initialRoutePath: null as string | null,
  testingArray: [{
    key1: 'value1',
    key2: undefined as string | undefined,
  }, {
    key1: 'value2',
    key2: undefined as string | undefined,
  }],
  testingObject: {
    key1: 'value1',
    key2: undefined as string | undefined,
  },
  testingNestedObject: {
    nestedKey: {
      nestedValue: 'nestedValue',
    },
  },
}

export const globalMiddleware = async(props: MiddlewareProps) => {
  props.res.setHeader('X-Custom-Header', 'Corract Middleware')
  someMemoryStore.calls += 1
  someMemoryStore.lastCall = new Date().toISOString()
  someMemoryStore.currentRoutePath = props.req.url
  if (!someMemoryStore.initialRoutePath) {
    someMemoryStore.initialRoutePath = props.req.url
  }

  return {
    meta: [],
    title: '',
    data: someMemoryStore,
  }
}
