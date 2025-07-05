import type { RouteConfig, MiddlewareFunction } from "../src/routes";

export type Mode = "dev" | "build" | "start";

export type SetupCorractOptions<Routes extends RouteConfig> = {
  routes: Routes;
  // optionally middleware, layout, etc.
};

export { RouteConfig, MiddlewareFunction };
