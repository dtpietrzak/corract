/* eslint-disable @stylistic/max-len */
import { Page } from 'corract'
import { Link, Text } from 'src/components'
import { Header, SubHeader, CodeBlock, Code } from 'src/pages/docs/_components'

const DocsAppDef: Page<'/docs/app/def', AppPages> = (props) => {
  return (
    <>
      <Header>
        <Code>app-def.ts</Code>
      </Header>
      <Text tag={'p'} color={'black.soft'}>
        The <Code>app-def.ts</Code> file is the central configuration file that defines the shape and behavior of your Corract application. It specifies all routes, their layouts, their middleware, and associated API endpoints. Corract uses this file to generate the entire file structure under as well as to power client-side routing and server-side behavior. (<Link href={'/docs/app/client'} color={'green.hard'}>see: app-client.tsx</Link>)
      </Text>
      <Text tag={'p'} color={'purple.soft'} className={'text-lg'}>
        This is the heart of the “super-opinionated” approach Corract takes: instead of you creating files and wiring up routing manually, Corract generates what it needs based on app-def.ts.
      </Text>
      <SubHeader>
        Structure
      </SubHeader>
      <Text tag={'p'} color={'black.soft'}>
        The <Code>pages</Code> object defines the routes your app supports, and how each route is composed. Each route entry supports:
      </Text>
      <ul>
        <Text tag={'li'} color={'black.soft'}>
          key – The URL path for the route, e.g. <Code>/home</Code>.
        </Text>
        <Text tag={'li'} color={'black.soft'}>
          <Code>layout</Code> – The layout component that wraps this route, e.g. <Code>HomeLayout</Code>.
        </Text>
        <Text tag={'li'} color={'black.soft'}>
          <Code>middleware</Code> – An optional server-side middleware function that runs before rendering the page.
        </Text>
      </ul>
      {/* @ts-ignore */}
      <CodeBlock language={'typescript'}>
        {`export const pages = {
  '/': {
    middleware: [globalMiddleware],
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
    middleware: [globalMiddleware],
    layouts: [Navbar],
  },
  ...appDefDocs,
} as const`}
      </CodeBlock>
    </>
  )
}

export default DocsAppDef
