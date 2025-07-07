import type { MiddlewareProps } from "corract";

const someMemoryStore = {
  calls: 0,
  lastCall: null as string | null,
  initialRoutePath: null as string | null,
};

export const globalMiddleware = async (props: MiddlewareProps) => {
  props.res.setHeader("X-Custom-Header", "Corract Middleware");
  someMemoryStore.calls += 1;
  someMemoryStore.lastCall = new Date().toISOString();
  someMemoryStore.initialRoutePath = props.req.url;

  return {
    meta: [], // use babel to inject this
    title: "", // use babel to inject this
    data: someMemoryStore,
  };
};
