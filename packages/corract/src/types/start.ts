import type { JSX } from 'preact'
import type { PagesConfig } from './pages'

export type Mode = 'dev-build' | 'dev-serve' | 'prod-build' | 'prod-serve'

export type StartCorractOptions<PagesConf extends PagesConfig> = {
  pages: PagesConf;
  client: JSX.Element;
  port: number;
}
