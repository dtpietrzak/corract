import { setupCorract } from "corract";

export const routes = {
  home: {
    path: "/",
    middleware: [/* some functions */],
    // maybe component import path, etc
  },
  profile: {
    path: "/profile",
    middleware: [/* ... */],
  },
} as const;

export type RouteKey = keyof typeof routes;

export type RouteConfig = typeof routes[RouteKey];

setupCorract({
  routes: routes,
});
