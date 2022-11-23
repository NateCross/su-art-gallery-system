import React from 'react'
import { Head, Link } from '@inertiajs/inertia-react';
import { Artwork } from '../../Components/Artwork';
import { Pagination } from '../../Components/Pagination';
import { Search } from '../../Components/Search';

export default function Index({ auth, artworks }) {
  console.log(artworks);
  const searchParams = new URLSearchParams(window.location.search);
  const searchQuery = searchParams.get('search');

  return (
    <>
      <Head title="Artworks" />

      {searchQuery ? (
        <h1>Searching for {searchQuery}</h1>
      ) : (
        <h1>Artworks</h1>
      )}

      <Link
        className={`
          btn btn-primary ${!auth?.user ? 'invisible' : ''}
        `}
        href='/artworks/create'
      >
        Add Artwork
      </Link>
      <ul>
        {artworks.data.map((data) => (
          <Artwork data={data} key={data?.title} />
        ))}
      </ul>
      <div className='btn-group'>
        <Pagination links={artworks?.links} page={artworks?.current_page} />
      </div>
    </>
  )
}
