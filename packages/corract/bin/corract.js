#!/usr/bin/env node
/* eslint-disable no-undef */

const args = process.argv.slice(2)
process.env.CORRACT_MODE = args[0]

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { spawn } = require('child_process')

const appEntry = `${process.cwd()}/src/app-start.tsx`

const child = spawn('tsx', [appEntry, ...args.slice(1)], {
  stdio: 'inherit',
  env: process.env,
})

child.on('exit', (code) => process.exit(code))
