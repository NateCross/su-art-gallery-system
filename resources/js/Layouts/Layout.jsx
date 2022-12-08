import { Link } from '@inertiajs/inertia-react'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus, } from '@fortawesome/free-solid-svg-icons';
import { usePage } from '@inertiajs/inertia-react';
import { Search } from '../Components/Search';
import { faUser, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { getImageFromDisk } from '@/Utils';
import { faReact, faLaravel } from '@fortawesome/free-brands-svg-icons';
import { themeChange } from 'theme-change';


function LogoLink() {
  return (
    <div className='navbar-start'>
      <Link 
        className='
          btn 
          btn-ghost 
          uppercase
          text-2xl
          text-primary-content
          font-bold
          hover:text-neutral-content
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
          ${(!isTab & isActive) && 'text-secondary'}
          text-base-content
          sm:text-primary-content
          sm:hover:text-neutral-content
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
      dropdown-end
      sm:hidden
    '>
      <label 
        tabIndex={0} 
        className="
          btn 
          btn-ghost 
          btn-circle
          text-xl
          focus:text-neutral
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
        w-32
        sm:w-56
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
    <div className="divider my-1" />
    <li>
      <button
        data-toggle-theme='light,dark'
        data-act-class="ACTIVECLASS"
        className='
          btn
          btn-ghost
          btn-circle
          gap-2
          w-full
          align-middle
        '
      >
        <FontAwesomeIcon icon={faSun} />
        /
        <FontAwesomeIcon icon={faMoon} />
      </button>
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
    <div className="
      dropdown 
      dropdown-end 
      sm:inline-block
      h-12
      z-[1000]
    ">
      <label 
        tabIndex={0} 
        className="
          btn 
          btn-ghost 
          btn-circle
          text-xl
          focus:text-primary
      ">
        { auth?.user?.avatar ? (
          <div className='avatar'>
            <div className='rounded-full'>
              <img 
                src={getImageFromDisk(auth.user.avatar)} 
                height='100'
                width='100'
                className='
                '
              />
            </div>
          </div>
        ) : (
          <FontAwesomeIcon 
            icon={faUser} 
          />
        )}
      </label>
      <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-300 rounded-box w-56 mt-4 text-base-content">
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
        <p className='text-sm'>
          Made with
          <FontAwesomeIcon icon={faReact} className='mx-1' />
          <FontAwesomeIcon icon={faLaravel} className='mx-1' />

          by <a href='https://www.facebook.com/nathanangelocruz' className='inline-block underline' > Nathan Cruz  </a> and <a href='https://www.facebook.com/dane.dedoroy' className='inline-block underline' > Dane Dedoroy </a>
        </p>

      </div>


    </footer>
  </>
}

export default function Layout({ children }) {
  const { auth } = usePage().props;
  useEffect(() => {
    themeChange(false)
  }, []);

  return <div className='flex flex-col h-screen w-screen sm:w-auto'>
    <header
      className='
        navbar
        bg-primary
        text-primary-content
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
