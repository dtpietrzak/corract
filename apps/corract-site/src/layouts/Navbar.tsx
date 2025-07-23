import { type LayoutProps } from 'corract'
import { MiniLogo } from 'src/assets'
import { FlexCol, Link, TextInput, Text } from 'src/components'


const Navbar = (props: LayoutProps) => {
  return (
    <FlexCol className={'h-screen'}>
      <nav className={'bg-gray-50 dark:bg-gray-950 px-4 py-2 shadow-md border-b border-black/10 dark:border-white/20'}>
        <ul className={'flex flex-row justify-between items-center gap-3'}>
          <ul className={'flex flex-row items-center gap-2'}>
            <li>
              <Link href={'/'} color={'black.hard'}>
                <MiniLogo/>
              </Link>
            </li>
            <li>
              <Text tag={'h1'} color={'black.faint'}>
                v0.1
              </Text>
            </li>
          </ul>
          {/* search bar that flexes as wide as it can */}
          <li className={'flex-1 mr-4'}>
            <TextInput
              color={'black.hard'}
              placeholder={'Search...'}
              className={'w-full'}
            />
          </li>
          <ul className={'flex flex-row gap-7'}>
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
              <Link
                target={'_blank'}
                href={'https://github.com/dtpietrzak/corract'}
                color={'black.hard'}
              >
                Github
              </Link>
            </li>
          </ul>
        </ul>
      </nav>
      <div className={'flex-1 flex flex-col bg-gray-100 dark:bg-gray-900 overflow-hidden'}>
        {props.children}
      </div>
    </FlexCol>
  )
}

export default Navbar
