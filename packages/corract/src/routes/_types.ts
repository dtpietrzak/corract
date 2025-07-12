/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */

import type { Request, Response } from 'express'
import type { SuperJsonValue } from '../_types'

export type MiddlewareProps = {
  req: Request;
  res: Response;
}

export type MiddlewareFunction<Data extends SuperJsonValue = any> = (
  props: MiddlewareProps,
) => Promise<{
  title?: string;
  meta?: string[];
  data: Data;
}>

export type MiddlewareReturn<T extends MiddlewareFunction> = T extends
(...args: any[]) => Promise<infer R> ? R : never

export type LayoutProps = {
  children: preact.ComponentChildren;
}

export type LayoutComponent = (props: LayoutProps) => preact.JSX.Element

export type RouteConfigItem<M extends SuperJsonValue = any> = {
  middleware?: readonly MiddlewareFunction<M>[];
  layouts?: readonly LayoutComponent[];
  meta?: readonly string[];
  title?: string;
}

export type RouteConfigItemExtended = RouteConfigItem & {
  pageName: string;
  filePath: string;
}
export type RouteConfigExtended = Record<string, RouteConfigItemExtended>

export type RouteConfig<
  Path extends string & keyof RouteConfig = string,
> = Record<Path, RouteConfigItem>

export type AppRoutes<Path extends string & keyof AppRoutes = string> =
  typeof globalThis extends { AppRoutes: infer T } ? T : RouteConfig<Path>

export type PageProps<
  Path extends string & keyof _AppRoutes,
  _AppRoutes extends AppRoutes<Path> = AppRoutes,
> = {
  routes: _AppRoutes;
  route: _AppRoutes[Path];
  path: Path;
}

export type Page<
  Path extends string & keyof _AppRoutes,
  _AppRoutes extends AppRoutes<Path> = AppRoutes,
> = (
  props: PageProps<Path, _AppRoutes>,
) => preact.JSX.Element

export interface CorractRequest extends Request {
  __SSR_DATA__?: Record<string, SuperJsonValue>;
}

// export type RouteMiddleWare<R extends Routes> = typeof routes[R]["middleware"];
