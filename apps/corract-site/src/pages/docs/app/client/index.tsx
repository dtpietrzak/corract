
import { Page } from 'corract'
import { Link, Text } from 'src/components'
import { Header, Code } from 'src/pages/docs/_components'

const DocsAppClient: Page<'/docs/app/client', AppPages> = (props) => {
  return (
    <>
      <Header>
        <Code>app-client.tsx</Code>
      </Header>
      <Text tag={'p'} color={'black.soft'}>
        The <Code>app-client.tsx</Code> is where the client entry point for your Corract application is defined. It is responsible for setting up the client-side routing and rendering the appropriate components based on the routes defined in <Code>app-def.ts</Code>. (<Link href={'/docs/app/def'} color={'green.hard'}>see: app-def.ts</Link>)
      </Text>
    </>
  )
}

export default DocsAppClient
