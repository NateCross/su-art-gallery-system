import { Pagination } from '@/Components/Pagination';
import { Artwork as ArtworkComponent } from '../../Components/Artwork';
import React from 'react'

function NoArtworksMessage() {
  return (
    <h2>Search did not return any results</h2>
  )
}

export default function Artwork({ artworks }) {
  console.log(artworks);
  return <>
    <h1>Hi</h1>

    <ul>
      {artworks.data.map((data) => (
        <ArtworkComponent data={data} key={data?.title} />
      ))}
    </ul>
    <div className='btn-group'>
      <Pagination links={artworks?.links} page={artworks?.current_page} />
    </div>
  </>
}
