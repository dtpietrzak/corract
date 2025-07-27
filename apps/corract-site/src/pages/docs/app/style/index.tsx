/* eslint-disable @stylistic/max-len */

import { Page } from 'corract'
import { Text } from 'src/components'
import { Header, Code } from 'src/pages/docs/_components'

const DocsAppStyle: Page<'/docs/app/style', AppPages> = (props) => {
  return (
    <>
      <Header>
        <Code>app-style.css</Code>
      </Header>
      <Text tag={'p'} color={'black.soft'}>
        The <Code>app-style.css</Code> file is where you define the global styles for your Corract application. It allows you to set up the base styles that will be applied across all components and pages in your app. This file is essential for maintaining a consistent look and feel throughout your application.
      </Text>
    </>
  )
}

export default DocsAppStyle
