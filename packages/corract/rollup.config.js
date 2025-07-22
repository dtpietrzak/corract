import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'

const input = {
  index: 'src/index.tsx',
  'start/runner': 'src/start/runner.ts',
  'jsx/jsx-runtime': 'src/jsx/jsx-runtime.ts',
  'jsx/jsx-dev-runtime': 'src/jsx/jsx-dev-runtime.ts',
}

const shared = {
  plugins: [typescript(), commonjs(), nodeResolve()],
  input: input,
}

export default [
  {
    ...shared,
    output: {
      dir: 'dist',
      format: 'esm',
      entryFileNames: '[name].js',
    },
    external: ['preact', 'preact/hooks', 'node:fs/promises', 'preact-render-to-string', 'vite', 'express'],
  },
  // {
  //   ...shared,
  //   output: {
  //     dir: 'dist/cjs',
  //     format: 'cjs',
  //     entryFileNames: '[name].js',
  //   },
  // },
]
