import { Page } from 'corract'

const MyPage: Page<'/docs/app/def', AppPages> = (props) => {
  return (
    <>
      <h1>My Page</h1>
      <a href="/">Go Home</a>
    </>
  )
}

export default MyPage
