/// <reference types="preact" />

export * from "preact/jsx-runtime";

import type { Request, Response, NextFunction } from "express";
import type { SetupCorractOptions, Mode, RouteConfig, MiddlewareFunction } from "./_types";
import { checkRoutes, parseRoutes } from "./routes";
import { runtimeDistributor } from "./runtime/_distributor";

export const setupCorract = <Routes extends RouteConfig>(
  options: SetupCorractOptions<Routes>,
) => {
  const mode: Mode = process.env.CORRACT_MODE as Mode;

  checkRoutes(options.routes);
  console.log("Routes registered:", options.routes);

  runtimeDistributor({
    mode: mode,
    routes: options.routes,
  });
};

export const middlewareHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
  middleware: MiddlewareFunction,
) => {
  const serverDerivedData = await middleware({
    req: req,
    res: res,
  });
  // @ts-ignore
  req.serverDerivedData = serverDerivedData;
  next();
};

export * from "./_types";