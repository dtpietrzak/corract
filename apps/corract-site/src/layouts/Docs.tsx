import { type LayoutProps } from 'corract'
import { FlexCol, FlexRow, Link, Text } from 'src/components'

const Docs = (props: LayoutProps) => {
  return (
    <FlexRow className={'flex-1 overflow-y-hidden'}>
      <FlexCol className={'w-56 pr-4 pt-4 shadow-md rounded-tr-3xl rounded-br-3xl bg-gray-200 dark:bg-black/30 overflow-y-scroll'}>
        <Text tag={'h4'} color={'gold.soft'} className={'font-bold pl-3 text-2xl'}>
          corract@0.1
        </Text>
        <nav className={'flex-1'}>
          <ul className={'flex flex-col gap-0 pt-2 pb-7'}>
            <NavItem href={'/docs'} text={'Introduction'}/>
            <NavSeparator/>
            <NavItem href={'/docs/app/def'} text={'app-def'}/>
            <NavItem href={'/docs/app/client'} text={'app-client'}/>
            <NavItem href={'/docs/app/start'} text={'app-start'}/>
            <NavItem href={'/docs/app/style'} text={'app-style'}/>
            <NavSeparator/>
            <NavItem href={'/docs/src/pages'} text={'src/pages'}/>
            <NavItem href={'/docs/src/layouts'} text={'src/layouts'}/>
            <NavItem href={'/docs/src/middleware'} text={'src/middleware'}/>
            <NavItem href={'/docs/src/components'} text={'src/components'}/>
            <NavItem href={'/docs/src/assets'} text={'src/assets'}/>
            <NavItem href={'/docs/src/styles'} text={'src/styles'}/>
            <NavSeparator/>
            <NavItem href={'/docs/tools/hooks'} text={'Hooks'}/>
            <NavItem href={'/docs/tools/components'} text={'Components'}/>
            <NavSeparator/>
            <NavItem href={'/docs/third-party/preact'} text={'Preact'}/>
            <NavItem href={'/docs/third-party/express'} text={'Express'}/>
            <NavItem href={'/docs/third-party/vite'} text={'Vite'}/>
            <NavItem href={'/docs/third-party/tailwind'} text={'Tailwind'}/>
            <NavItem href={'/docs/third-party/typescript'} text={'TypeScript'}/>
            <NavItem href={'/docs/third-party/eslint'} text={'ESLint'}/>
          </ul>
        </nav>
      </FlexCol>
      <FlexRow className={'flex-1 p-4 overflow-y-scroll'}>
        <FlexCol className={'flex-1 p-1 md:p-7 gap-7'}>
          {props.children}
        </FlexCol>
      </FlexRow>
    </FlexRow>
  )
}

type NavItemProps = {
  href: string;
  text: string;
}

const NavItem = (props: NavItemProps) => {
  const isActive = typeof window !== 'undefined' && window.location.pathname === props.href
  const activeClass = isActive ? 'font-bold bg-white dark:bg-gray-800 hover:bg-white! dark:hover:bg-gray-800!' : ''

  return (
    <Link href={props.href} color={'black.hard'}>
      <li className={`py-1 pl-5 rounded-tr-2xl rounded-br-2xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors ${activeClass}`}>
        {props.text}
      </li>
    </Link>

  )
}

const NavSeparator = () => {
  return (
    <hr className={'my-2 w-11/12 text-white/5'}/>
  )
}

export default Docs
