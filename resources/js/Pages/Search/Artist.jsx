import { Pagination } from '@/Components/Pagination';
import { getImageFromDisk } from '@/Utils';
import { Link } from '@inertiajs/inertia-react';
// import { Artwork as ArtworkComponent } from '../../Components/Artwork';
import React from 'react'

function ArtistComponent({ data }) {
  return (
    <li>
      <Link
        href={route('artists.show', data.id)}
        className='
          flex
          flex-col
        '
      >
        <div
          className='
            avatar
          '
        >
          <div className='
            h-36
            w-36
            md:h-48
            md:w-48
            rounded-full
          '>
            <img 
              src={getImageFromDisk(data?.image)}
            />
          </div>
        </div>
        <p
          className='
            text-center
          '
        >
          {data.name}
        </p>
      </Link>
    </li>
  )
}

export default function Artist({ artists }) {
  console.log(artists);
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
          border-md
        '
      >
        Artists: {searchQuery}
      </h1>
    </div>

    { artists.data.length === 0 ? <>
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
          No Users Found
        </h1>
      </div>
    </> : <>
      <ul className='
        m-5
        text-2xl
        grid
        grid-cols-2
        md:grid-cols-4
        gap-y-5
        grid-flow-row-dense
        place-items-center
      '>
        {artists.data.map((data) => (
          <ArtistComponent data={data} key={data?.email} />
        ))}
      </ul>
      <div className='
        btn-group
        grid
        place-items-center
      '>
        <Pagination links={artists?.links} page={artists?.current_page} />
      </div>
    </>}

  </>
}
