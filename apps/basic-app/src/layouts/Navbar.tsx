import { type LayoutProps } from 'corract'
import { FlexCol, Link } from 'src/components'

const Navbar = (props: LayoutProps) => {
  return (
    <FlexCol className={'min-h-screen'}>
      <nav className={'bg-gray-50 dark:bg-gray-950 p-2 shadow-md'}>
        <ul className={'flex flex-row gap-4'}>
          <li>
            <Link href={'/'} color={'black.hard'}>
              Home
            </Link>
          </li>
          <li>
            <Link href={'/docs'} color={'black.hard'}>
              Docs
            </Link>
          </li>
        </ul>
      </nav>
      <div className={'flex-1 flex flex-col bg-gray-100 dark:bg-gray-900 p-4'}>
        {props.children}
      </div>
    </FlexCol>
  )
}

export default Navbar
