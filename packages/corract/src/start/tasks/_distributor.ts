import type { Mode, RouteConfig, StartCorractOptions } from '_types'
import { startDev } from './dev-server'

export const runtimeDistributor = (props: {
  mode: Mode;
  options: StartCorractOptions<RouteConfig>;
}) => {
  const scriptMap = {
    dev: 'runtime/dev-server.ts',
    build: 'runtime/build.ts',
    start: 'runtime/start-server.ts',
  }

  if (!scriptMap[props.mode]) {
    console.error(`Unknown command "${props.mode}". Use one of: dev, build, start.`)
    process.exit(1)
  }

  switch (props.mode) {
    case 'dev':
      startDev({
        options: props.options,
      })
      break
    default:
      throw new Error(`Unknown CORRACT_MODE: ${props.mode}`)
  }
}
