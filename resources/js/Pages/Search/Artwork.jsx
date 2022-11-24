import { Pagination } from '@/Components/Pagination';
// import { Artwork as ArtworkComponent } from '../../Components/Artwork';
import GalleryDisplay from '@/Components/GalleryDisplay'
import React from 'react'


export default function Artwork({ artworks }) {
  console.log(artworks);
  const searchParams = new URLSearchParams(window.location.search);
  const searchQuery = searchParams.get('search');
  return <>
    <h1
      className='
        text-3xl
        font-bold
      '
    >
      Search: {searchQuery}
    </h1>

    <GalleryDisplay artworks={artworks} />
  </>
}
