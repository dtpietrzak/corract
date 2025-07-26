import { Page } from 'corract'
import { Logo } from 'src/components/Logo'
import { Text, FlexCol } from 'src/components'

export const Home: Page<'/', AppPages> = (props) => {
  return (
    <FlexCol className={'flex-1 items-center justify-center p-2'}>
      <Text tag={'h1'} color={'black.soft'} className={'font-black text-5xl text-shadow-lg'}>
        Welcome to Corract!
      </Text>
      <Text tag={'p'} color={'gold.hard'} className={'font-bold'}>
        The Super Opinionated <s>React</s> Preact Framework
      </Text>
      <div className={'motion-safe:animate-bounce'}>
        <Logo/>
      </div>
    </FlexCol>
  )
}

export default Home
