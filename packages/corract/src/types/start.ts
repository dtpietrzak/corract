import type { JSX } from 'preact'
import type { PagesConfig } from './pages'

export type Mode = 'dev' | 'build' | 'start'

export type StartCorractOptions<PagesConf extends PagesConfig> = {
  pages: PagesConf;
  client: JSX.Element;
  port: number;
}
