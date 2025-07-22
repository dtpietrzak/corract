import { globalMiddleware } from './middleware/global'
import Navbar from './layouts/Navbar'
import ProfileDashboard from './layouts/Profile'

export const pages = {
  '/': {
    middleware: [globalMiddleware],
    layouts: [Navbar],
  },
  '/profile': {
    middleware: [globalMiddleware],
    layouts: [Navbar, ProfileDashboard],
  },
  '/profile/demo': {
    middleware: [globalMiddleware],
    layouts: [],
  },
  '/profile/:id': {
    middleware: [globalMiddleware],
    layouts: [ProfileDashboard],
  },
  '/tasks': {
    middleware: [],
    layouts: [Navbar],
  },
} as const

export const api = {
  '/api/profile': ['GET', 'POST', 'PATCH', 'DELETE'],
}

declare global {
  type AppPages = typeof pages
  type AppPaths = keyof typeof pages
  type AppMiddleWare<R extends AppPaths> = typeof pages[R]['middleware']
}
