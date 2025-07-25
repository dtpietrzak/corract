#!/usr/bin/env node
/* eslint-disable no-undef */

import { spawn } from 'child_process'
import fs from 'node:fs'

const args = process.argv.slice(2)
process.env.CORRACT_MODE = args[0]


const appEntry = `${process.cwd()}/src/app-start.tsx`
const appClient = `${process.cwd()}/src/app-client.tsx`

const tempClientCode = `export const Client = () => <></>`

fs.rm(appClient, { force: true }, (err) => {
  if (err) {
    console.error(`Error removing app client file: ${err.message}`)
  } else {
    console.info(`Removed app client file: ${appClient}`)
    fs.writeFile(appClient, tempClientCode, (writeErr) => {
      if (writeErr) {
        console.error(`Error writing temporary client code: ${writeErr.message}`)
      } else {
        const child = spawn('tsx', [appEntry, ...args.slice(1)], {
          stdio: 'inherit',
          env: process.env,
        })

        child.on('exit', (code) => process.exit(code))
      }
    })
  }
})


