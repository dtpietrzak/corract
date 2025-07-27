import { Page } from 'corract'
import { Link } from 'src/components'
import { Header } from 'src/pages/docs/_components'

const DocsTailwind: Page<'/docs/third-party/tailwind', AppPages> = (props) => {
  return (
    <>
      <Header>
        Tailwind
      </Header>
      <Link
        external
        target={'_blank'}
        href={'https://tailwindcss.com'}
        color={'black.hard'}
      >
        Check out Tailwind's documentation
      </Link>
    </>
  )
}

export default DocsTailwind
