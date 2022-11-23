import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';

function Welcome(props) {
  return (
    <>
      <Head title="Welcome" />
      {/* <Header auth={props.auth} /> */}
      {/* <div className="fixed top-0 right-0 px-6 py-4 sm:block">
        {props.auth.user ? (
          <Link href={route('dashboard')} className="text-sm text-gray-700 dark:text-gray-500 underline">
            Dashboard
          </Link>
        ) : (
          <>
            <Link href={route('login')} className="text-sm text-gray-700 dark:text-gray-500 underline">
              Log in
            </Link>

            <Link
              href={route('register')}
              className="ml-4 text-sm text-gray-700 dark:text-gray-500 underline"
            >
              Register
            </Link>
          </>
        )}
      </div> */}

      { /* This is mainly to test the display of user */ }
      { props?.auth?.user ? (
          <h1
            className='
              text-xl
              font-bold
            '
          >
            Hello, {props.auth.user.name}
          </h1>
        ) : (
          <h1
            className='
              text-xl
              font-bold
            '
          >
            Welcome
          </h1>
        )
      }

      <Link
        href='/artworks'
        className='btn btn-primary'
      >Artworks</Link>
    </>
  );
}

// Welcome.layout = page => <Header children={page} />

export default Welcome;