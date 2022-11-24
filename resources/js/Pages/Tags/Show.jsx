import { Head } from '@inertiajs/inertia-react';
import React from 'react'
import { Artwork } from '../../Components/Artwork';
import { Pagination } from '../../Components/Pagination';

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

      {artworks?.data?.length > 0 ? (
        <>
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
  </>
}
