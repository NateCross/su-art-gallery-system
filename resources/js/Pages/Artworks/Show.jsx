import { Link } from '@inertiajs/inertia-react';
import React from 'react'
import { getImageFromDisk } from '../../Utils';

export default function Show({ auth, artwork }) {
  console.log(auth);
  console.log(artwork);

  const isArtist = artwork.users[0].id === auth?.user?.id;

  return (
    <>
      <img
        src={getImageFromDisk(artwork?.path)}
      />

      {isArtist && (
        <>
          <Link
            className='btn btn-primary'
            href={`${window.location.href}/edit`}
          >Edit</Link>
          <Link
            className='btn btn-warning'
            as='button'
            href={window.location.href}
            method='delete'
          >
            Delete
          </Link>
        </>
      )}
    </>
  )
}
