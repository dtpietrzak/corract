import { Page, useServerState } from 'corract'

export const Profile: Page<'/profile', AppPages> = (props) => {
  const [globalMiddleware] = useServerState(props.page)

  return (
    <>
      <h1>Profile Page</h1>
      <a href={'/'}>Go to Home</a>
      <br/>
      {`initial route: ${globalMiddleware.initialRoutePath}`}
      <br/>
      {`current route: ${globalMiddleware.currentRoutePath}`}
      <br/>
      {`call count: ${globalMiddleware.calls}`}
      <br/>
    </>
  )
}

export default Profile
