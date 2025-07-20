import type { JSX } from 'preact'
import type { AppRoutes } from './routes'

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
  // eslint-disable-next-line no-unused-vars
  props: PageProps<Path, _AppRoutes>,
) => JSX.Element
