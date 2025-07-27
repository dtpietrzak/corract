import { Page } from 'corract'
import { Link } from 'src/components'
import { Header } from 'src/pages/docs/_components'


const DocsComponents: Page<'/docs/tools/components', AppPages> = (props) => {
  return (
    <>
      <Header>
        Components
      </Header>
      <Link
        external
        target={'_blank'}
        href={'https://preactjs.com/guide/v10/components'}
        color={'black.hard'}
      >
        All of Preact's components
      </Link>
    </>
  )
}

export default DocsComponents
