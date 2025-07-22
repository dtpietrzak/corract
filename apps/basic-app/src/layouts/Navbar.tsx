import { type LayoutProps } from 'corract'
import { Link } from 'components'

const Navbar = (props: LayoutProps) => {
  return (
    <>
      <nav className={'bg-gray-50 dark:bg-gray-950 p-2 shadow-md'}>
        <ul className={'flex flex-row gap-4'}>
          <li>
            <Link
              href={'/'}
              className={'text-gray-800 dark:text-gray-200'}
            >
              Home
            </Link>
          </li>
          <li>
            <Link href={'/profile'}>Profile</Link>
          </li>
        </ul>
      </nav>
      <div className={'bg-gray-100 dark:bg-gray-900 p-4'}>
        {props.children}
      </div>
    </>
  )
}

export default Navbar
