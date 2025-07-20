import type { RouteConfig } from './routes'
import type { SuperJsonValue } from './super-json'

export type ClientProps<RC extends RouteConfig = RouteConfig> = {
  ssrRoutePath?: keyof RC;
  middlewareData?: Record<string, SuperJsonValue>;
}
