import Navbar from './layouts/Navbar'
// import Profile from './layouts/Profile'
import { appDefDocs } from './app-def-docs'
import { PagesConfig } from 'corract'

export const layouts = {
  navbar: {
    component: Navbar,
    middleware: [],
  },
}

export const pages = {
  '/': {
    middleware: [],
    layouts: [layouts.navbar],
  },
  ...appDefDocs,
} as const satisfies PagesConfig

export const api = {
  '/api/profile': ['GET', 'POST', 'PATCH', 'DELETE'],
}

declare global {
  type AppPages = typeof pages
  type AppPaths = keyof typeof pages
  type AppMiddleWare<R extends AppPaths> = typeof pages[R]['middleware']
}
