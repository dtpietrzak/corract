import { Page } from "corract";

export const Home: Page<"/"> = (props) => {
  return (
    <>
      <h1>Home Page</h1>
      <a href="/profile">Go to Profile</a>
    </>
  );
}

export default Home;