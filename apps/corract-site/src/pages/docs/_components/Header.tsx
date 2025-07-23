import type { Children } from 'corract'
import { Text } from 'src/components'

export type HeaderProps = {
  children: Children;
}

export const Header = (props: HeaderProps) => {
  return (
    <Text tag={'h1'} color={'black.soft'} className={'font-black text-5xl text-shadow-lg'}>
      {props.children}
    </Text>
  )
}
