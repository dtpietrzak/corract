import { Page } from "corract";

export const Profile: Page<"/profile"> = (props) => {
  return (
    <>
      <h1>Profile Page</h1>
      <a href="/">Go to Home</a>
    </>
  );
}

export default Profile;