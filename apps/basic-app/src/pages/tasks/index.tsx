import { Page } from 'corract'

const MyPage: Page<'/tasks', AppPages> = (props) => {
  return (
    <>
      <h1>Tasks</h1>
      <a href={'/'}>Go Home</a>
    </>
  )
}

export default MyPage
