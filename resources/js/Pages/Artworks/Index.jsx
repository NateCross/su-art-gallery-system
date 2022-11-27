import React from 'react'
import { Head, Link } from '@inertiajs/inertia-react';
import { Pagination } from '../../Components/Pagination';
import GalleryDisplay from '@/Components/GalleryDisplay';

export default function Index({ auth, artworks }) {
  console.log(artworks);

  return (
    <>
      <Head title="Artworks" />

      {/* <Link
        className={`
          btn btn-primary ${!auth?.user ? 'invisible' : ''}
        `}
        href='/artworks/create'
      >
        Add Artwork
      </Link> */}
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
          <p className='
            text-lg
          '>
            Login to an account to add artworks
          </p>
        </div>
      </> : (
        <GalleryDisplay artworks={artworks} />
      )}

    </>
  )
}
