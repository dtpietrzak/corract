export * from './client'
export * from './layouts'
export * from './middleware'
export * from './pages'
export * from './pages'
export * from './server'
export * from './start'
export * from './super-json'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __SSR_DATA__?: any;
  }
}
