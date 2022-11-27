import React from 'react'
import { Head } from '@inertiajs/inertia-react';
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
        className='text-4xl font-bold mx-5'
      >
        {artist?.name}
      </h1>

      <GalleryDisplay artworks={artworks} />

    </>
  )
}
