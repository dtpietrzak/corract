#!/usr/bin/env node

const args = process.argv.slice(2);
process.env.CORRACT_MODE = args[0];

const { spawn } = require("child_process")

const appEntry = `${process.cwd()}/src/app-def.ts`;

const child = spawn('tsx', [appEntry, ...args.slice(1)], {
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code) => process.exit(code));
