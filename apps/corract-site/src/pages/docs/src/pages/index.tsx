

import { Page } from 'corract'
import { Link, Text } from 'src/components'
import { Header, Code } from 'src/pages/docs/_components'

const DocsSrcPages: Page<'/docs/src/pages', AppPages> = (props) => {
  return (
    <>
      <Header>
        <Code>src/pages</Code>
      </Header>
      <Text tag={'p'} color={'black.soft'}>
        The <Code>src/pages</Code> directory is where your application's pages live. When you make your <Link href={'/docs/app/def'} color={'green.hard'}>app-def.ts</Link> file, and then run a build, Corract generates the necessary files and directories under <Code>src/pages</Code>. This structure is automatically created based on the routes defined in your <Code>app-def.ts</Code>, allowing you to focus on building your application without worrying about the underlying file structure. <i>The default export from the index.tsx file, is the component that will render for that given page.</i> ex: <Code>src/pages/some-route/index.tsx</Code> will render for the <Code>/some-route</Code> route.
      </Text>
    </>
  )
}

export default DocsSrcPages
