import { Pagination } from '@/Components/Pagination';
import { Link } from '@inertiajs/inertia-react';
// import { Artwork as ArtworkComponent } from '../../Components/Artwork';
import React from 'react'

function NoArtworksMessage() {
  return (
    <h2>Search did not return any results</h2>
  )
}

function ArtistComponent({ data }) {
  return (
    <li>
      <Link
        href={route('artists.show', data.id)}
      >
        {data.name}
      </Link>
    </li>
  )
}

export default function Artist({ artists }) {
  console.log(artists);
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

    <ul>
      {artists.data.map((data) => (
        <ArtistComponent data={data} key={data?.email} />
      ))}
    </ul>
    <div className='btn-group'>
      <Pagination links={artists?.links} page={artists?.current_page} />
    </div>
  </>
}
