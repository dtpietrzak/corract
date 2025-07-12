import { setupCorract } from 'corract'
import { globalMiddleware } from './middleware/global'
import Navbar from './layouts/Navbar'
import ProfileDashboard from './layouts/Profile'

/**
 * this flat syntax will be way more maintainable than a nested one + recursive
 * one, It'll just be a bit more complex to map out the front end routing
 * component, since we'll have to determine which layouts wrap which routes
 * but this is a one time thing, so it's worth it
 */

export const routes = {
  '/': {
    middleware: [globalMiddleware],
    layouts: [Navbar],
  },
  '/profile': {
    middleware: [globalMiddleware],
    layouts: [Navbar, ProfileDashboard],
  },
  '/profile/:id': {
    middleware: [globalMiddleware],
    layouts: [ProfileDashboard],
  },
  '/profile/demo': {
    middleware: [globalMiddleware],
    layouts: [],
  },
} as const

declare global {
  type AppRoutes = typeof routes
  type AppPaths = keyof typeof routes
  type AppMiddleWare<R extends AppPaths> = typeof routes[R]['middleware']
}

setupCorract({
  routeConfig: routes,
})
