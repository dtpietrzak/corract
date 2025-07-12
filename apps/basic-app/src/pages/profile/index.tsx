import { Page, useServerState } from 'corract'

export const Profile: Page<'/profile', AppRoutes> = (props) => {
  // const thing = useServerState(props.route)

  return (
    <>
      <h1>Profile Page</h1>
      <a href={'/'}>Go to Home</a>
    </>
  )
}

export default Profile
