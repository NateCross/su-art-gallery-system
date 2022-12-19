import { Head } from '@inertiajs/inertia-react';
import React from 'react'
import GalleryDisplay from '@/Components/GalleryDisplay';

export default function Show({ auth, tag, artworks }) {
  return <>
    <Head 
      title={tag?.name}
    />

    <h1
      className='
        mx-5
        text-4xl
        font-bold
      '
    >
      {tag?.name}
    </h1>
    <GalleryDisplay auth={auth} artworks={artworks} />
  </>
}
