import type { MiddlewareFunction } from './middleware'
import type { LayoutConfig } from './layouts'
import type { SuperJsonValue } from './super-json'
import type { JSX } from 'preact'

export type PageConfig<
  // eslint-disable-next-line @stylistic/max-len
  MW extends readonly MiddlewareFunction<SuperJsonValue>[] = readonly MiddlewareFunction<SuperJsonValue>[],
> = {
  middleware?: MW;
  layouts?: readonly LayoutConfig[];
  meta?: readonly string[];
  title?: string;
}

export type PageConfigExtended = PageConfig & {
  pageName: string;
  filePath: string;
}
export type PagesConfigExtended = Record<string, PageConfigExtended>

export type PagesConfig<
  Path extends string & keyof PagesConfig = string,
> = Record<Path, PageConfig>

export type AppPages<Path extends string & keyof AppPages = string> =
  typeof globalThis extends { AppPages: infer T } ? T : PagesConfig<Path>

export type PageProps<
  Path extends string & keyof _AppPages,
  _AppPages extends AppPages<Path> = AppPages,
> = {
  pages: _AppPages;
  page: _AppPages[Path];
  path: Path;
}

export type Page<
  Path extends string & keyof _AppPages,
  _AppPages extends AppPages<Path> = AppPages,
> = (
  // eslint-disable-next-line no-unused-vars
  props: PageProps<Path, _AppPages>,
) => JSX.Element
