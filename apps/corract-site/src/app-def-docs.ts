import { docsMiddleware } from './middleware/docs'
import Navbar from './layouts/Navbar'
import Docs from './layouts/Docs'

const layouts = {
  navbar: {
    component: Navbar,
    middleware: [],
  },
  docs: {
    component: Docs,
    middleware: [],
  },
}

const docsPageConfig = {
  middleware: [docsMiddleware],
  layouts: [layouts.navbar, layouts.docs],
} as const

export const appDefDocs = {
  // overview
  '/docs': docsPageConfig,
  // app
  '/docs/app/def': docsPageConfig,
  '/docs/app/client': docsPageConfig,
  '/docs/app/start': docsPageConfig,
  '/docs/app/style': docsPageConfig,
  // src
  '/docs/src/pages': docsPageConfig,
  '/docs/src/layouts': docsPageConfig,
  '/docs/src/middleware': docsPageConfig,
  '/docs/src/components': docsPageConfig,
  '/docs/src/assets': docsPageConfig,
  '/docs/src/styles': docsPageConfig,
  // tools
  '/docs/tools/hooks': docsPageConfig,
  '/docs/tools/components': docsPageConfig,
  // third party stuff
  '/docs/third-party/preact': docsPageConfig,
  '/docs/third-party/express': docsPageConfig,
  '/docs/third-party/vite': docsPageConfig,
  '/docs/third-party/tailwind': docsPageConfig,
  '/docs/third-party/typescript': docsPageConfig,
  '/docs/third-party/eslint': docsPageConfig,
} as const
