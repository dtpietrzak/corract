import { Page } from 'corract'
import { Link } from 'src/components'
import { Header } from 'src/pages/docs/_components'

const DocsPreact: Page<'/docs/third-party/preact', AppPages> = (props) => {
  return (
    <>
      <Header>
        Preact
      </Header>
      <Link
        external
        target={'_blank'}
        href={'https://preactjs.com/guide/v10/getting-started'}
        color={'black.hard'}
      >
        Check out Preact's documentation
      </Link>
    </>
  )
}

export default DocsPreact
