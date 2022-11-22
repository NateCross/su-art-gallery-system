import { Link } from '@inertiajs/inertia-react'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCaretDown } from '@fortawesome/free-solid-svg-icons';

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

function Navbar() {
  return (
    <div className='navbar-center'>

    </div>
  )
}

function Dropdown({ auth }) {
  return (
    <div className="dropdown dropdown-end hidden sm:inline-block">
      <label 
        tabIndex={0} 
        className="
          btn 
          btn-ghost 
          rounded-btn 
          focus:text-primary
      ">
        {auth?.user?.name}
        <FontAwesomeIcon 
          icon={faCaretDown} 
          className='ml-2'
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

function Search() {
  return (
    <form
      className='relative hidden sm:block'
    >
      <input 
        type="search" 
        name="search" 
        id="search" 
        placeholder="Search"
        results
        className="
          input 
          input-bordered
          w-full
          max-w-xs
        "
      />
      <button 
        type="submit"
        className='
          absolute
          inset-y-0
          right-0
          flex
          items-center
          pr-3
          transition-all
          hover:text-primary
          focus:text-primary
        '
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  )
}

function HeaderEnd({ auth }) {
  return (
    <div className="
      navbar-end 
      gap-2 
    ">
      <Dropdown auth={auth} />
      <Search />
    </div>
  )
}

export default function Header({ auth }) {
  return (
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
  )
}
