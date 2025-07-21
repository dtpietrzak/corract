import { Page } from 'corract'

export const Home: Page<'/', AppPages> = (props) => {
  return (
    <div className={'flex flex-col h-screen p-4'}>
      <h1 className={'font-black text-4xl'}>Home Page</h1>
      <a href={'/profile'}>Go to Profile</a>
    </div>
  )
}

export default Home
