import type { Children } from 'corract'
import { Text } from 'src/components'

export type SubHeaderProps = {
  children: Children;
}

export const SubHeader = (props: SubHeaderProps) => {
  return (
    <Text tag={'h1'} color={'black.soft'} className={'font-bold text-3xl'}>
      {props.children}
    </Text>
  )
}
