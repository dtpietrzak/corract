import { Page } from 'corract'
import { Logo } from 'src/assets/Logo'
import { Text, FlexCol, Link } from 'src/components'

export const Home: Page<'/', AppPages> = (props) => {
  return (
    <FlexCol className={'flex-1 items-center justify-center p-2'}>
      <Text tag={'h1'} color={'black.hard'} className={'font-black text-5xl'}>
        Welcome to Corract!
      </Text>
      <Text tag={'p'} color={'gold.hard'} className={'font-bold'}>
        The Super Opinionated <s>React</s> Preact Framework
      </Text>
      <div className={'motion-safe:animate-bounce'}>
        <Logo/>
      </div>
      <Link href={'/profile'} color={'gold.hard'}>Go to Profile Editor</Link>
      <Link href={'/profile/demo'} color={'green.hard'}>Go to Demo Profile</Link>
      <Link href={'/profile/john'} color={'purple.hard'}>Go to John's Profile</Link>
    </FlexCol>
  )
}

export default Home
