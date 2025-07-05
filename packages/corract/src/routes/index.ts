import type { Express, Request, RequestHandler, Response } from "express";
import type { ViteDevServer } from "vite";

import fs from "node:fs/promises";
import path from "node:path";
import isObject from "isobject";
import { middlewareHandler } from "corract";

// export type MiddlewareFunction = <Props extends Record<string, any>>(
//   req: Request, res: Response,
// ) => Promise<Props>;
export type MiddlewareFunction = (
  req: Request, res: Response,
) => Promise<any>;

export type RouteConfig = Record<string, {
  middleware?: readonly MiddlewareFunction[];
}>;

export const checkRoutes = (routes: RouteConfig): boolean => {
  if (!isObject(routes)) {
    throw new Error("Routes must be a RouteConfig object!");
  }

  for (const routePath of Object.keys(routes)) {
    if (typeof routePath !== "string" || !routePath.startsWith("/")) {
      throw new Error(
        `Invalid route: ${routePath}. Routes must be strings starting with '/'`,
      );
    }
  }

  return true;
};

export const registerRoutes = (props: {
  app: Express;
  vite: ViteDevServer;
  routes: RouteConfig;
}): void => {
  for (const routePath of Object.keys(props.routes)) {
    const routeConfig = props.routes[routePath];

    // Destructure middleware or use empty array if none
    const middlewares = routeConfig.middleware || [];
    const middlewareFunctions: RequestHandler[] = middlewares.map(
      (middleware) => {
        return async (req: Request, res: Response, next: Function) => {
          try {
            // Call the middleware function and get derived data
            const serverDerivedData = await middleware(req, res);
            // Attach the derived data to the request object
            (req as any).serverDerivedData = serverDerivedData;
            next();
          } catch (error) {
            // Handle any errors from the middleware
            props.vite.config.logger.error(
              `Error in middleware for ${req.url}: ${error}`,
            );
            res.status(500).send("Internal Server Error");
          }
        };
      },
    );

    // Compose the final handler
    const handler = async (req: Request, res: Response) => {
      props.vite.config.logger.info(`Transforming HTML for ${req.url}`);
      const html = await fs.readFile(path.resolve("index.html"), "utf-8");

      const data = (req as any).serverDerivedData;
      const script = `<script>window.__SERVER_DERIVED_DATA__ = ${
        JSON.stringify(data)
      };</script>`;
      const dataInjected = html.replace("</body>", `${script}</body>`);

      const transformed = await props.vite.transformIndexHtml(
        req.url,
        dataInjected,
      );

      res.send(transformed);
    };

    // Register route with middleware and handler
    props.app.get(routePath, ...middlewareFunctions, handler);
  }
};
