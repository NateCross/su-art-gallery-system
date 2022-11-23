import { Link } from '@inertiajs/inertia-react'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { usePage } from '@inertiajs/inertia-react';
import { Search } from '../Components/Search';

function LogoLink() {
  return (
    <div className='navbar-start'>
      <Link 
        className='
          btn 
          btn-ghost 
          uppercase
          text-xl
        '
        href='/'
      >
        SU Artfolio
      </Link>
    </div>
  )
}

function NavLink({ name, routeLink, isActive }) {
  const styles = isActive ? `
    text-primary
    hover:text-primary-focus
  ` : `
  `;
  return (
    <li>
      <Link
        href={route(routeLink)}
        className={`
          transition-all
          btn
          btn-ghost
          ${styles}
        `}
      >
        {name}
      </Link>
    </li>
  )
}

const Links = [
  {
    name: 'Home',
    link: 'home',
  },
  {
    name: 'Artworks',
    link: 'artworks.index',
  }
]

function Navbar() {
  return (
    <ul className='
      navbar-center
      items-center

      hidden
      sm:flex
    '>
      {Links.map((item) => (
        <NavLink
          name={item.name}
          routeLink={item.link}
          isActive={route().current(item.link)}
          key={item.name}
        />
      ))}
    </ul>
  )
}

function Dropdown({ auth }) {
  if (!auth?.user) return null;
  return (
    <div className="dropdown dropdown-end hidden sm:inline-block">
      <label 
        tabIndex={0} 
        className="
          btn 
          btn-ghost 
          btn-circle
          text-xl
          focus:text-primary
      ">
        <FontAwesomeIcon 
          icon={faBars} 
        />
      </label>
      <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-300 rounded-box w-52 mt-4">
        <li>
          <Link
            href={route('artworks.create')}
          >
            Upload Artwork
          </Link>
        </li>
        <div className="divider my-1" />
        <li>
          <Link
            href={route('artists.show', auth?.user?.id)}
          >
            My Profile
          </Link>
        </li>
        <li>
          <Link
            method="post"
            href={route('logout')}
            as="button"
          >
            Log Out
          </Link>
        </li>
      </ul>
    </div>
  )
}

function Hamburger({ auth }) {
  return (

    <div className="dropdown dropdown-end">

    </div>
  )
}

// function Search() {
//   return (
//     <form
//       className='relative hidden sm:block'
//     >
//       <input 
//         type="search" 
//         name="search" 
//         id="search" 
//         placeholder="Search"
//         className="
//           input 
//           input-bordered
//           w-full
//           max-w-xs
//         "
//       />
//       <button 
//         type="submit"
//         className='
//           absolute
//           inset-y-0
//           right-0
//           flex
//           items-center
//           pr-3
//           transition-all
//           hover:text-primary
//           focus:text-primary
//         '
//       >
//         <FontAwesomeIcon icon={faMagnifyingGlass} />
//       </button>
//     </form>
//   )
// }

function LoginLogout({ auth }) {
  if (auth?.user) return null;
  
  return <>
    <Link
      href={route('login')}
      className='
        btn 
        btn-ghost 
        uppercase
        text-xl
      '
    >
      Login
    </Link>
    <Link
      href={route('register')}
      className='
        btn 
        btn-ghost 
        uppercase
        text-xl
      '
    >
      Register
    </Link>
  </>
}

function HeaderEnd({ auth }) {
  return (
    <div className="
      navbar-end 
      gap-2 
    ">
      <Search />
      <Dropdown auth={auth} />
      <LoginLogout auth={auth} />

    </div>
  )
}

export default function Header({ children }) {
  const { auth } = usePage().props;

  return <>
    <header
      className='
        navbar
        bg-base-300
      '
    >
      <LogoLink />
      <Navbar />
      <HeaderEnd auth={auth} />
    </header>
    <main>
      {children}
    </main>
  </>
}