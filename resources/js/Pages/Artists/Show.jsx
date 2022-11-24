import React from 'react'
import { Head } from '@inertiajs/inertia-react';
import { Pagination } from '../../Components/Pagination';
import GalleryDisplay from '@/Components/GalleryDisplay';

export default function Show({ auth, artist, artworks }) {
  console.log(artist);
  console.log(artworks);
  return (
    <>
      <Head 
        title={`${artist?.name}: Profile`}
      />
      <h1
        className='text-2xl font-bold'
      >
        {artist?.name}
      </h1>

      <GalleryDisplay artworks={artworks} />

    </>
  )
}
