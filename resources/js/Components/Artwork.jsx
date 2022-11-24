import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export function Artwork({ data }) {
  return (
    <li>
      <Link
        href={`/artworks/${data.id}`}
      >
        <h2>{data?.title}</h2>
        <p>By {data?.users[0]?.name}</p>
        <img src={`/${data?.path.replace('public', 'storage')}`} alt="" />
      </Link>
    </li>
  );
}
