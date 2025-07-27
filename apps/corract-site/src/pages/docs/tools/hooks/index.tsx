import { Page } from 'corract'
import { Text, Link } from 'src/components'
import { Header, CodeBlock } from 'src/pages/docs/_components'


const DocsHooks: Page<'/docs/tools/hooks', AppPages> = (props) => {
  return (
    <>
      <Header>
        Hooks
      </Header>
      <Text tag={'p'} color={'black.hard'}>
        useServerState()
      </Text>
      <CodeBlock language={'typescript'}>
        {`import { useServerState } from 'corract'

export const MyComponent: Page<'/my-component', AppPages> = (props) => {
  const [middlewareUno, middlewareDos] = useServerState(props.page)

  return (<></>)
}`}
      </CodeBlock>
      <Link
        external
        target={'_blank'}
        href={'https://preactjs.com/guide/v10/hooks'}
        color={'black.hard'}
      >
        All of Preact's hooks
      </Link>
    </>
  )
}

export default DocsHooks
