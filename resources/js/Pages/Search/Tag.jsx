import { Pagination } from '@/Components/Pagination';
import { Link } from '@inertiajs/inertia-react';
import React from 'react'

function NoArtworksMessage() {
  return (
    <h2>Search did not return any results</h2>
  )
}

function TagComponent({ data }) {
  return (
    <li>
      <Link
        href={route('tags.show', data.id)}
      >
        {data.name}
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
      '>
        {tags.data.map((data) => (
          <TagComponent data={data} key={data?.email} />
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
