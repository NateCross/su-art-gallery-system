import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';

function Welcome(props) {
  console.log(props);
  return (
    <>
      <Head title="Welcome" />

      <div className='
        hero
        h-full
      '>
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-6xl font-bold max-w-lg text-red-700">SOAP
            </h1>
            <h2 className='
              text-info
              text-3xl
              font-bold
            '>
              Silliman Online Art Portfolio
            </h2>
            <p className="py-6">
              The online showcase for Silliman University Fine Arts
            </p>
            <Link
              href={route('artworks.index')}
              className='btn btn-primary mb-8'
            >
              View Artworks
            </Link>
            { !props?.auth?.user?.id && (
              <div
                className='
                  flex
                  items-center
                  justify-center
                  gap-3
                  flex-wrap
                '
              >
                <Link
                  href={route('register')}
                  className='btn'
                >
                  Fine Arts student? Register here
                </Link>
                <Link
                  href={route('login')}
                  className='btn'
                >
                  Login
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

// Welcome.layout = page => <Header children={page} />

export default Welcome;