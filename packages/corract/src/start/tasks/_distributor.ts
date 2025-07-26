import type { Mode, PagesConfig, StartCorractOptions } from 'src/types'
import { startDevBuild } from './dev-build'
import { startDevServe } from './dev-serve'
import { startProdBuild } from './prod-build'
import { startProdServe } from 'src/start/tasks/prod-serve'

export const runtimeDistributor = (props: {
  mode: Mode;
  options: StartCorractOptions<PagesConfig>;
}) => {
  switch (props.mode) {
    case 'dev-build':
      startDevBuild({
        options: props.options,
      })
      break
    case 'dev-serve':
      startDevServe({
        options: props.options,
      })
      break
    case 'prod-build':
      startProdBuild({
        options: props.options,
      })
      break
    case 'prod-serve':
      startProdServe({
        options: props.options,
      })
      break
    default:
      throw new Error(`Unknown CORRACT_MODE: ${props.mode}`)
  }
}
