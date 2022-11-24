import { Head } from '@inertiajs/inertia-react';
import React from 'react'
import GalleryDisplay from '@/Components/GalleryDisplay';

export default function Show({ tag, artworks }) {
  console.log(tag);
  console.log(artworks);
  return <>
    <Head 
      title={tag?.name}
    />

    <h1
      className='
        font-bold
        text-3xl
      '
    >
      {tag?.name}
    </h1>
    <GalleryDisplay artworks={artworks} />
  </>
}
