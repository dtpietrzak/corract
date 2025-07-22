import { type LayoutProps } from 'corract'
import { MiniLogo } from 'src/assets'
import { FlexCol, Link, TextInput } from 'src/components'


const Navbar = (props: LayoutProps) => {
  return (
    <FlexCol className={'min-h-screen'}>
      <nav className={'bg-gray-50 dark:bg-gray-950 px-4 py-2 shadow-md border-b border-black/10 dark:border-white/20'}>
        <ul className={'flex flex-row justify-between items-center gap-4'}>
          <li>
            <Link href={'/'} color={'black.hard'}>
              <MiniLogo/>
            </Link>
          </li>
          {/* search bar that flexes as wide as it can */}
          <li className={'flex-1'}>
            <TextInput
              color={'black.hard'}
              placeholder={'Search...'}
              className={'w-full'}
            />
          </li>
          <li>
            <Link href={'/docs'} color={'black.hard'}>
              Docs
            </Link>
          </li>
          <li>
            <Link href={'/docs'} color={'black.hard'}>
              Blog
            </Link>
          </li>
          <li>
            <Link href={'/docs'} color={'black.hard'}>
              Github
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
