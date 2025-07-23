
import { Page } from 'corract'

export const MyPage: Page<'/profile/demo', AppPages> = (props) => {
  return (
    <>
      <h1>Demo Page</h1>
      <a href={'/'}>Go Home</a>
    </>
  )
}

export default MyPage
