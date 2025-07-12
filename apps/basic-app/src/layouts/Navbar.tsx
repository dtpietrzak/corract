import { type LayoutProps } from 'corract'

const Navbar = (props: LayoutProps) => {
  return (
    <>
      <nav style={{
        width: '100%',
        height: '50px',
        backgroundColor: '#DDD',
      }}
      >
        <ul>
          <li>
            <a href={'/'}>Home</a>
          </li>
          <li>
            <a href={'/profile'}>Profile</a>
          </li>
        </ul>
      </nav>
      <div>
        {props.children}
      </div>
    </>
  )
}

export default Navbar
