import { setupCorract } from "corract";
import { globalMiddleware } from "./middleware/global";

export type Routes = keyof typeof routes;
export type RouteMiddleWare<R extends Routes> = typeof routes[R]["middleware"];

export const routes = {
  "/": {
    middleware: [globalMiddleware],
  },
  "/profile": {
    middleware: [globalMiddleware],
  },
};

setupCorract({
  routes: routes,
});
