import type { Mode, PagesConfig, StartCorractOptions } from 'src/types'
import { startDev } from './dev-server'
import { startBuild } from './build'

export const runtimeDistributor = (props: {
  mode: Mode;
  options: StartCorractOptions<PagesConfig>;
}) => {
  const scriptMap = {
    dev: 'dev-server.ts',
    build: 'build.ts',
    start: 'prod-server.ts',
  }

  if (!scriptMap[props.mode]) {
    console.error(`Unknown command "${props.mode}". Use one of: dev, build, prod.`)
    process.exit(1)
  }

  switch (props.mode) {
    case 'dev':
      startDev({
        options: props.options,
      })
      break
    case 'build':
      startBuild({
        options: props.options,
      })
      break
    default:
      throw new Error(`Unknown CORRACT_MODE: ${props.mode}`)
  }
}
