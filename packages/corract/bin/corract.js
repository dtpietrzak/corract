#!/usr/bin/env node
/* eslint-disable no-undef */

import { spawn } from 'child_process'

const args = process.argv.slice(2)
process.env.CORRACT_MODE = args[0]

const appEntry = `${process.cwd()}/src/app-start.tsx`

const child = spawn('tsx', [appEntry, ...args.slice(1)], {
  stdio: 'inherit',
  env: process.env,
})

child.on('exit', (code) => process.exit(code))
