import { Page } from 'corract'
import { Link } from 'src/components'
import { Header } from 'src/pages/docs/_components'

const DocsTypescript: Page<'/docs/third-party/typescript', AppPages> = (props) => {
  return (
    <>
      <Header>
        Typescript
      </Header>
      <Link
        external
        target={'_blank'}
        href={'https://www.typescriptlang.org'}
        color={'black.hard'}
      >
        Check out Typescript's documentation
      </Link>
    </>
  )
}

export default DocsTypescript
