import { Page } from 'corract'
import { Logo } from '../assets/corract'

export const Home: Page<'/', AppPages> = (props) => {
  return (
    <div className={'flex flex-col h-screen items-center justify-center p-2'}>
      <h1 className={'font-black dark:font-white text-5xl'}>Welcome to Corract!</h1>
      <div className={'scale-50 motion-safe:animate-bounce'}>
        <Logo/>
      </div>
      <a href={'/profile'}>Go to Profile</a>
      <a href={'/profile/demo'}>Go to Demo Profile</a>
      <a href={'/profile/john'}>Go to John's Profile</a>
    </div>
  )
}

export default Home
