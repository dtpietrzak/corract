import { Page } from 'corract'
import { Link } from 'src/components'
import { Header } from 'src/pages/docs/_components'

const DocsVite: Page<'/docs/third-party/vite', AppPages> = (props) => {
  return (
    <>
      <Header>
        Vite
      </Header>
      <Link
        external
        target={'_blank'}
        href={'https://vite.dev'}
        color={'black.hard'}
      >
        Check out Vite's documentation
      </Link>
    </>
  )
}

export default DocsVite
