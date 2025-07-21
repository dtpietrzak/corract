import { type LayoutProps } from 'corract'

const Navbar = (props: LayoutProps) => {
  return (
    <>
      <nav className={'bg-gray-50 dark:bg-gray-950 p-2 shadow-md'}>
        <ul className={'flex flex-row gap-4'}>
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
