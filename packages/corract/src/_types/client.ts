import type { PagesConfig } from './pages'
import type { SuperJsonValue } from './super-json'
import type { JSX } from 'preact'

export type ClientProps<PagesConf extends PagesConfig = PagesConfig> = {
  ssrPagePath?: keyof PagesConf;
  middlewareData?: Record<string, SuperJsonValue>;
}

export type Children = JSX.Element | JSX.Element[] | string | number | boolean | null | undefined

export type { JSX } from 'preact'
