import React from 'react'
import { Head } from '@inertiajs/inertia-react';
import GalleryDisplay from '@/Components/GalleryDisplay';
import { Link } from '@inertiajs/inertia-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Show({ auth, artist, artworks }) {
  return (
    <>
      <Head 
        title={`${artist?.name}: Profile`}
      />
      <h1
        className='text-4xl font-bold mx-5'
      >
        {artist?.name}
      </h1>

      { artworks.data.length === 0 ? <>
        <div className='
          h-full
          gap-5
          flex
          flex-col
          items-center
          justify-center
        '>
          <h1 className='
            font-bold
            text-5xl
            text-center
          '>
            No Artworks Found
          </h1>
          { auth?.user?.id === artist?.id && (
            <Link
              href={route('artworks.create')}
              className='
                btn
                btn-primary
                text-lg
              '
            >
              <FontAwesomeIcon font={faPlus} />
              Add Artwork
            </Link>
          )}
        </div>
      </> : (
        <GalleryDisplay auth={auth} artworks={artworks} />
      )}

    </>
  )
}
