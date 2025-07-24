import { globalMiddleware } from './middleware/global'
import Navbar from './layouts/Navbar'
import Profile from './layouts/Profile'
import { appDefDocs } from './app-def-docs'

export const pages = {
  '/': {
    middleware: [globalMiddleware, globalMiddleware],
    layouts: [Navbar],
  },
  '/profile': {
    middleware: [globalMiddleware],
    layouts: [Navbar, Profile],
  },
  '/profile/demo': {
    middleware: [globalMiddleware],
    layouts: [],
  },
  '/profile/:id': {
    middleware: [globalMiddleware],
    layouts: [Profile],
  },
  '/tasks': {
    middleware: [],
    layouts: [Navbar],
  },
  ...appDefDocs,
} as const

export const api = {
  '/api/profile': ['GET', 'POST', 'PATCH', 'DELETE'],
}

declare global {
  type AppPages = typeof pages
  type AppPaths = keyof typeof pages
  type AppMiddleWare<R extends AppPaths> = typeof pages[R]['middleware']
}
