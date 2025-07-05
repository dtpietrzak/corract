import type { MiddlewareFunction } from "corract";

const someMemoryStore = {
  calls: 0,
  lastCall: null as string | null,
}

export const globalMiddleware: MiddlewareFunction = async (req, res) => {
  res.setHeader("X-Custom-Header", "Corract Middleware");
  someMemoryStore.calls += 1;
  someMemoryStore.lastCall = new Date().toISOString();

  return someMemoryStore;
};
