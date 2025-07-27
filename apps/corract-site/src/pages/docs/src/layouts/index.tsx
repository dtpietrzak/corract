

import { Page } from 'corract'
import { Link, Text } from 'src/components'
import { Header, Code } from 'src/pages/docs/_components'

const DocsSrcLayouts: Page<'/docs/src/layouts', AppPages> = (props) => {
  return (
    <>
      <Header>
        <Code>src/layouts</Code>
      </Header>
      <Text tag={'p'} color={'black.soft'}>
        The <Code>src/layouts</Code> directory is where you define the layouts for your application's pages. Layouts are used to wrap your pages with common UI elements, such as headers, footers, and sidebars. This allows you to maintain a consistent look and feel across different pages of your application. When you create a layout, it can be applied to specific routes in your <Link href={'/docs/app/def'} color={'green.hard'}>app-def.ts</Link> file, enabling you to control the structure of your pages effectively.
      </Text>
    </>
  )
}

export default DocsSrcLayouts
