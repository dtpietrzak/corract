/* eslint-disable @stylistic/max-len */

import { Page } from 'corract'
import { Text } from 'src/components'
import { Header, Code } from 'src/pages/docs/_components'

const DocsSrcStyles: Page<'/docs/src/styles', AppPages> = (props) => {
  return (
    <>
      <Header>
        <Code>src/styles</Code>
      </Header>
      <Text tag={'p'} color={'black.soft'}>
        The <Code>src/styles</Code> directory is where you define the global styles for your Corract application. This directory typically contains .ts or .css files that define the overall look and feel of your application. You can import these styles into your components or pages to ensure a consistent design across your app. This structure allows you to manage your styles in a modular way, making it easier to maintain and update them as your application evolves.
      </Text>
    </>
  )
}

export default DocsSrcStyles
