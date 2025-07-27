

import { Page } from 'corract'
import { Link, Text } from 'src/components'
import { Header, Code } from 'src/pages/docs/_components'

const DocsSrcAssets: Page<'/docs/src/assets', AppPages> = (props) => {
  return (
    <>
      <Header>
        <Code>src/assets</Code>
      </Header>
      <Text tag={'p'} color={'black.soft'}>
        The <Code>src/assets</Code> directory is where you store static assets for your Corract application. This includes images, fonts, and other files that are not part of the application logic but are necessary for the user interface. Assets in this directory can be referenced in your components and stylesheets, allowing you to enhance the visual appeal of your application. It is important to organize your assets properly to ensure they are easily accessible and maintainable. They're bundled by the build process using <Link color={'purple.hard'} href={'/docs/third-party/vite'}>Vite</Link>, so you can reference them directly in your components or stylesheets without worrying about paths.
      </Text>
    </>
  )
}

export default DocsSrcAssets
