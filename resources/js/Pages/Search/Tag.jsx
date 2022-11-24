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
    <h1
      className='
        text-3xl
        font-bold
      '
    >
      Search: {searchQuery}
    </h1>

    <ul>
      {tags.data.map((data) => (
        <TagComponent data={data} key={data?.email} />
      ))}
    </ul>
    <div className='btn-group'>
      <Pagination links={tags?.links} page={tags?.current_page} />
    </div>
  </>
}
