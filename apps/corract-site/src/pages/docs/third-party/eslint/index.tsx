import { Page } from 'corract'
import { Link } from 'src/components'
import { Header } from 'src/pages/docs/_components'

const DocsEslint: Page<'/docs/third-party/eslint', AppPages> = (props) => {
  return (
    <>
      <Header>
        ESLint
      </Header>
      <Link
        external
        target={'_blank'}
        href={'https://eslint.org'}
        color={'black.hard'}
      >
        Check out ESLint's documentation
      </Link>
    </>
  )
}

export default DocsEslint
