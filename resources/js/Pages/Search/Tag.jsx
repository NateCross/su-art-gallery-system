import { Pagination } from '@/Components/Pagination';
import { getImageFromDisk } from '@/Utils';
import { Link } from '@inertiajs/inertia-react';
import React from 'react'

function NoArtworksMessage() {
  return (
    <h2>Search did not return any results</h2>
  )
}

function TagComponent({ data }) {
  return (
    <li className='
      w-full
      h-full
    '>
      <Link
        href={route('tags.show', data.id)}
        className='
        '
      >
        <div className='
          h-36
          w-36
          md:h-48
          md:w-48
          grid
          place-items-center
          relative
          transition-all
        '>
          <p className='
            z-50
            absolute
            top-1/2
            left-1/2
            transform
            -translate-x-1/2
            -translate-y-1/2
            text-stroke
            font-bold
            text-primary-content
          '>
            {data.name}
          </p>
          <div className={`
            grid
            grid-rows-2
            grid-cols-2
            absolute
            top-0
            left-0
            h-full
            w-full
            bg-base-300
            rounded-xl
          `}>
            { data.artworks_search.map((artwork) => (
              <div className='
                h-full
                w-full
                blur-[1px]
              '>
                <img
                  src={getImageFromDisk(artwork.thumbnail)}
                  key={artwork.title}
                  className='
                    h-full
                    w-full
                    object-cover
                  '
                />
              </div>
            ))}

          </div>
        </div>
      </Link>
    </li>
  )
}

export default function Tag({ tags }) {
  console.log(tags);
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
        Tags: {searchQuery}
      </h1>
    </div>

    { tags.data.length === 0 ? <>
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
          No Tags Found
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
        {tags.data.map((data) => (
          <TagComponent data={data} key={data?.name} />
        ))}
      </ul>
      <div className='
        btn-group
        grid
        place-items-center
      '>
        <Pagination links={tags?.links} page={tags?.current_page} />
      </div>
    </>}

  </>
}
