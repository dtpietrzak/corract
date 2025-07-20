import { globalMiddleware } from './middleware/global'
import Navbar from './layouts/Navbar'
import ProfileDashboard from './layouts/Profile'

export const routes = {
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
} as const

declare global {
  type AppRoutes = typeof routes
  type AppPaths = keyof typeof routes
  type AppMiddleWare<R extends AppPaths> = typeof routes[R]['middleware']
}
