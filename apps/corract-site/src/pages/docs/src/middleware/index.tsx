/* eslint-disable @stylistic/max-len */

import { Page, useServerState } from 'corract'
import { Link, Text } from 'src/components'
import { Header, Code } from 'src/pages/docs/_components'

const DocsSrcMiddleware: Page<'/docs/src/middleware', AppPages> = (props) => {
  const [docsMiddleware] = useServerState(props.page)

  return (
    <>
      <Header>
        <Code>src/middleware</Code>
      </Header>
      <Text tag={'p'} color={'black.soft'}>
        The <Code>src/middleware</Code> directory is where you define middleware functions for your Corract application. The heart of Corract's SSR process. Middleware functions are used to intercept requests and responses, allowing you to perform actions such as authentication, logging, or modifying request data before it reaches the route handlers.
      </Text>
      <Text tag={'p'} color={'black.soft'}>
        This directory is essential for implementing custom logic that needs to run before or after the main request handling process. And is used to inject server side data into your components, enabling dynamic rendering based on the request context. Middleware is applied to specific routes as defined in your <Link href={'/docs/app/def'} color={'green.hard'}>app-def.ts</Link>, giving you flexibility in how you handle requests across your application.
      </Text>
      <Text tag={'p'} color={'purple.hard'}>
        This number: <Code>{docsMiddleware.calls}</Code> represents how many times any docs page has been rendered since the last restart. Try disabling JavaScript in your browser—this count will still increase. That's because the count is tracked in the docs routes' middleware, meaning the server renders and delivers the full page regardless of client-side JS. This highlights a core strength of Corract's SSR: complete page rendering without relying on JavaScript. Last render timestamp: <Code>{docsMiddleware.lastCall}</Code>.
      </Text>

    </>
  )
}

export default DocsSrcMiddleware
