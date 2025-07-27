import { Page } from 'corract'
import { Link } from 'src/components'
import { Header } from 'src/pages/docs/_components'

const DocsExpress: Page<'/docs/third-party/express', AppPages> = (props) => {
  return (
    <>
      <Header>
        Express
      </Header>
      <Link
        external
        target={'_blank'}
        href={'https://expressjs.com'}
        color={'black.hard'}
      >
        Check out Express' documentation
      </Link>
    </>
  )
}

export default DocsExpress
