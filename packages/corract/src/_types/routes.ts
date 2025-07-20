import type { MiddlewareFunction } from './middleware'
import type { LayoutComponent } from './layouts'
import type { SuperJsonValue } from './super-json'

export type RouteConfigItem<
  // eslint-disable-next-line @stylistic/max-len
  MW extends readonly MiddlewareFunction<SuperJsonValue>[] = readonly MiddlewareFunction<SuperJsonValue>[],
> = {
  middleware?: MW;
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
