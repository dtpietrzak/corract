
import { Page } from 'corract'

export const MyPage: Page<'/profile/:id', AppPages> = (props) => {
  return (
    <>
      <h1>My Page</h1>
      <a href={'/'}>Go Home</a>
    </>
  )
}

export default MyPage
