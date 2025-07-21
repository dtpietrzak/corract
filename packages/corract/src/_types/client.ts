import type { PagesConfig } from './pages'
import type { SuperJsonValue } from './super-json'

export type ClientProps<PagesConf extends PagesConfig = PagesConfig> = {
  ssrPagePath?: keyof PagesConf;
  middlewareData?: Record<string, SuperJsonValue>;
}
