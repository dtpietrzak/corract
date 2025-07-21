/// <reference types="preact" />

export type * from 'preact/jsx-runtime'

import type { StartCorractOptions, Mode, PagesConfig } from '../_types'
import { validatePagesConfig } from '../processes/shared/validatePagesConfig'
import { runtimeDistributor } from './tasks/_distributor'

let initialized = false

export const startCorract = <PagesConf extends PagesConfig>(
  options: StartCorractOptions<PagesConf>,
) => {
  if (initialized) {
    console.warn('Corract has already been initialized. Ignoring subsequent calls.')
    return options.pages
  }
  initialized = true

  const mode: Mode = process.env.CORRACT_MODE as Mode

  validatePagesConfig(options.pages)
  console.info('Pages validated:', options.pages)

  runtimeDistributor({
    mode: mode,
    options: options,
  })

  return options.pages
}
