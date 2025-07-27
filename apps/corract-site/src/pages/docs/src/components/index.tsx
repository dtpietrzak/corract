/* eslint-disable @stylistic/max-len */


import { Page } from 'corract'
import { Link, Text } from 'src/components'
import { Header, Code } from 'src/pages/docs/_components'

const DocsSrcComponents: Page<'/docs/src/components', AppPages> = (props) => {
  return (
    <>
      <Header>
        <Code>src/components</Code>
      </Header>
      <Text tag={'p'} color={'black.soft'}>
        The <Code>src/components</Code> directory is where you define globally reusable components for your Corract application. These components can be used across different pages and layouts and other components, allowing you to maintain a consistent design and functionality throughout your application. By organizing your components in this directory, you can easily manage and import them wherever needed, enhancing the modularity and maintainability of your codebase.
      </Text>
      <Text tag={'p'} color={'black.soft'}>
        Of course you can create components that are unique to individual pages or layouts colocated with them. For layout colocated components, place them anywhere, you manually define the layouts in the <Link href={'/docs/app/def'} color={'green.hard'}>app-def.ts</Link> file. So there's no conflict there. And for page colocated components, you can place them anywhere you want as well, remember as described on the <Link href={'/docs/src/pages'} color={'green.hard'}>src/pages</Link> page, the default export from the index.tsx file is the component that will render for that given page. ex: <Code>src/pages/some-route/index.tsx</Code> will render for the <Code>/some-route</Code> route. Any other file in that directory will never be rendered as a route.
      </Text>
      <Text tag={'p'} color={'gold.soft'}>
        The best convention for keeping colocated components organized is to create a <Code>_components</Code> directory within the page or layout directory. For example, if you have a page at <Code>src/pages/some-route/index.tsx</Code>, you can create a <Code>src/pages/some-route/_components</Code> directory and place your components there. This way, you can keep your page-specific components organized and easily accessible.
      </Text>
    </>
  )
}

export default DocsSrcComponents
