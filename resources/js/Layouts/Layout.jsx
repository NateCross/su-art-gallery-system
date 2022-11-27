import { Link } from '@inertiajs/inertia-react'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCoffee, faPlus } from '@fortawesome/free-solid-svg-icons';
import { usePage } from '@inertiajs/inertia-react';
import { Search } from '../Components/Search';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function LogoLink() {
  return (
    <div className='navbar-start'>
      <Link 
        className='
          btn 
          btn-ghost 
          uppercase
          text-2xl
          text-red-700
          font-bold
        '
        href='/'
      >
        SOAP
      </Link>
    </div>
  )
}

function NavLink({ name, routeLink, isActive, isTab = false }) {
  const styles = isActive ? `
    tab-active
  ` : `
  `;
  return (
    <li>
      <Link
        href={route(routeLink)}
        className={`
          transition-all
          ${isTab && 'tab tab-bordered'}
          ${styles}
          text-lg
          ${(!isTab & isActive) && 'text-primary'}
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
  return <>
    <div className='
      navbar-center
      dropdown
      sm:hidden
    '>
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
      <ul tabIndex={0} className='
        dropdown-content
        menu
        p-2
        shadow
        bg-base-300
        rounded-box
        w-56
        mt-4
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
    </div>

    <ul className='
      navbar-center
      items-center

      hidden
      sm:tabs
    '>
      {Links.map((item) => (
        <NavLink
          name={item.name}
          routeLink={item.link}
          isActive={route().current(item.link)}
          key={item.name}
          isTab
        />
      ))}
    </ul>
  </>
}

function LoggedInDropdown({ auth }) {
  if (!auth?.user) return null;

  return <>
    <li className='
      pointer-events-none
    '>
      <p className='font-bold'>
        Hello, {auth.user.name}
      </p>
    </li>
    <li>
      <Link
        href={route('artists.show', auth?.user?.id)}
      >
        My Artworks
      </Link>
    </li>
    <div className="divider my-1" />
    <li>
      <Link
        href={route('artworks.create')}
      >
        <FontAwesomeIcon icon={faPlus} />
        Add Artwork
      </Link>
    </li>
    <div className="divider my-1" />
    <li>
      <Link
        href={route('profile.edit')}
      >
        Account Settings
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
  </>
}

function GuestDropdown({ auth }) {
  if (auth?.user) return null;

  return <>
    <li>
      <Link
        href={route('register')}
      >
        Register
      </Link>
    </li>
    <li>
      <Link
        href={route('login')}
      >
        Login
      </Link>
    </li>
  </>
}

function Dropdown({ auth }) {
  // if (!auth?.user) return null;
  return (
    <div className="dropdown dropdown-end sm:inline-block">
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
          icon={faUser} 
        />
      </label>
      <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-300 rounded-box w-56 mt-4">
        <LoggedInDropdown auth={auth} />
        <GuestDropdown auth={auth} />
      </ul>
    </div>
  )
}

function HeaderEnd({ auth }) {
  return (
    <div className="
      navbar-end 
      gap-2 
    ">
      <Search />
      <Dropdown auth={auth} />

    </div>
  )
}

function Footer() {
  return <>
    <footer
      className='
        footer 
        items-center 
        p-4
        bg-neutral
        text-neutral-content
        mt-5
      '
    >
      <div className="items-center">
        <p>
          Made with
          <FontAwesomeIcon icon={faCoffee} className='mx-2' />
          by Nathan Cruz and Dane Dedoroy
        </p>
      </div>

    </footer>
  </>
}

export default function Layout({ children }) {
  const { auth } = usePage().props;

  return <div className='flex flex-col h-screen'>
    <header
      className='
        navbar
        bg-base-300
        mb-5
      '
    >
      <LogoLink />
      <Navbar />
      <HeaderEnd auth={auth} />
    </header>
    <main className='flex-grow'>
      {children}
    </main>
    <Footer />
  </div>
}
