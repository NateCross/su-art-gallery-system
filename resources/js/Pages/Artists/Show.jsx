import React from 'react'
import { Head } from '@inertiajs/inertia-react';
import { Artwork } from '../../Components/Artwork';
import { Pagination } from '../../Components/Pagination';

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

      {artworks?.data?.length > 0 ? (
        <>
          <h2>Artworks</h2>
          <ul>
            {artworks.data.map((data) => (
              <Artwork data={data} key={data?.title} />
            ))}
          </ul>
          <div className="btn-group">
            <Pagination links={artworks?.links} page={artworks?.current_page} />
          </div>
        </>
      ) : (
        <>
        </>
      )}
      {/* <h2>Artworks</h2>
      <ul>{artist?.artworks}</ul> */}
    </>
  )
}
