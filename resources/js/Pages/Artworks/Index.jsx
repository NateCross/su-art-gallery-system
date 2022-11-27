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

      <GalleryDisplay artworks={artworks} />
    </>
  )
}
