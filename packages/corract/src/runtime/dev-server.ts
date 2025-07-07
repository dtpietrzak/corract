import "esbuild-register/dist/node";

import { createServer } from "vite";
import express from "express";

import { buildAppEntry, registerRoutes } from "../routes";
import type { RouteConfig } from "../routes/_types";

export async function startDev(props: {
  routes: RouteConfig;
}) {
  const app = express();

  const vite = await createServer({
    appType: "custom",
    server: {
      middlewareMode: true,
    },
    optimizeDeps: {
      exclude: ["fsevents"],
    },
  });

  app.use(vite.middlewares);

  console.log("Using Vite config at:", vite.config.configFile, "\n");

  registerRoutes({
    app: app,
    vite: vite,
    routes: props.routes,
  });

  buildAppEntry({
    routes: props.routes,
  })

  app.listen(3000);
  console.log("Corract dev server running at http://localhost:3000");
}
