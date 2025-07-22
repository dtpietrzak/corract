import { type LayoutProps } from 'corract'
import { FlexCol, FlexRow, Link, Text } from 'src/components'

const Docs = (props: LayoutProps) => {
  return (
    <FlexRow className={'flex-1'}>
      <FlexCol className={'w-64 p-4 shadow-md rounded-xl bg-black/30'}>
        <Text tag={'h1'} color={'black.hard'} className={'font-black text-3xl'}>
          Documentation
        </Text>
        <nav className={'p-2'}>
          <ul className={'flex flex-col gap-2'}>
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
      </FlexCol>
      {props.children}
    </FlexRow>
  )
}

export default Docs
