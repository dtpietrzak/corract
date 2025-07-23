import { type LayoutProps } from 'corract'

const Profile = (props: LayoutProps) => {
  return (
    <>
      <h1>
        Profile layout
      </h1>
      {props.children}
    </>
  )
}

export default Profile
