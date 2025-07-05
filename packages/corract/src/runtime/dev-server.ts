import "esbuild-register/dist/node";

import { createServer } from "vite";
import preact from "@preact/preset-vite";
import express from "express";

import { registerRoutes, RouteConfig } from "../routes";

export async function startDev(props: {
  routes: RouteConfig;
}) {
  const app = express();

  const vite = await createServer({
    plugins: [preact()],
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

  app.listen(3000);
  console.log("Corract dev server running at http://localhost:3000");
}
