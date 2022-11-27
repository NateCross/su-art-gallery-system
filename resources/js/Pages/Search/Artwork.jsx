import { Pagination } from '@/Components/Pagination';
// import { Artwork as ArtworkComponent } from '../../Components/Artwork';
import GalleryDisplay from '@/Components/GalleryDisplay'
import React from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Artwork({ artworks }) {
  console.log(artworks);
  const searchParams = new URLSearchParams(window.location.search);
  const searchQuery = searchParams.get('search');
  return <>
    <div className='
      mx-5
      w-fit
    '>
      <h1
        className='
          text-4xl
          font-bold
        '
      >
        Artworks: {searchQuery}
      </h1>
    </div>

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
        </div>
      </> : (
        <GalleryDisplay artworks={artworks} />
      )}
  </>
}
