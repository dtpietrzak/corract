/* eslint-disable @stylistic/max-len */

import { Page } from 'corract'
import { Text } from 'src/components'
import { Header, Code } from 'src/pages/docs/_components'

const DocsAppStart: Page<'/docs/app/start', AppPages> = (props) => {
  return (
    <>
      <Header>
        <Code>app-start.tsx</Code>
      </Header>
      <Text tag={'p'} color={'black.soft'}>
        The <Code>app-start.tsx</Code> is the entry point for starting your Corract application server. It orchestrates the build process, compiles the application, and serves the application to clients. This file is crucial for setting up the production environment and ensuring that your application runs smoothly.
      </Text>
    </>
  )
}

export default DocsAppStart
