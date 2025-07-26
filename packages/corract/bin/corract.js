#!/usr/bin/env node
/* eslint-disable no-undef */

import { spawn } from 'child_process'
import fs from 'node:fs/promises'

const args = process.argv.slice(2)
process.env.CORRACT_MODE = args[0]

const appEntry = `${process.cwd()}/src/app-start.tsx`

const run = async() => {
  const appClient = `${process.cwd()}/src/app-client.tsx`

  fs.access(appClient, fs.constants.F_OK)
    .then(() => {})
    .catch(async() => {
      // If app-client.tsx does not exist, create it with a default export
      const defaultClientCode = `export const Client = () => <></>
`
      await fs.writeFile(appClient, defaultClientCode)
    })


  try {
    const child = spawn('tsx', [appEntry, ...args.slice(1)], {
      stdio: 'inherit',
      env: process.env,
    })

    child.on('exit', (code) => process.exit(code))
  } catch(err) {
    console.error(`Error during execution: ${err instanceof Error ? err.message : 'Unknown error'}`)
    process.exit(1)
  }
}

run()
