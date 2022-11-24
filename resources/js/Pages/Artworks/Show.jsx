import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from '@inertiajs/inertia-react';
import React, { useState } from 'react'
import { getImageFromDisk } from '../../Utils';
import Lightbox from 'react-18-image-lightbox';

// Fixes weird bug in Lightbox where global is not defined
window.global = window;

function DeleteModal({ artwork }) {
  return (
    <>
      <label htmlFor="delete-modal" className="btn btn-warning">Delete</label>

      <input type="checkbox" id="delete-modal" className="modal-toggle" />
      <label
        htmlFor='delete-modal'
        className="modal modal-bottom sm:modal-middle"
      >
        <label className="modal-box relative">
          <h3 className="font-bold text-2xl">Do you wish to delete?</h3>
          <div
            className='
              mt-8
              mb-3
              flex
              justify-evenly
              gap-5
            '
          >
            <Link
              className='btn btn-error text-lg'
              as='button'
              href={route('artworks.destroy', artwork.id)}
              method='delete'
            >
              Delete
            </Link>
            <label htmlFor="delete-modal" className="btn text-lg">
              Cancel
            </label>
          </div>
        </label>
      </label>
    </>
  )
}

function TagDisplay({ tag }) {
  return (
    <li
      className='
        badge
        text-lg
        transition-all
        hover:text-primary
      '
    >
      <Link
        href={route('tags.show', tag.id)}
      >
        {tag.name}
      </Link>
    </li>
  )
}

function ArtworkInfo({ artwork }) {
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);

  return <div>
    <img
      src={getImageFromDisk(artwork?.path)}
      width={artwork?.width}
      height={artwork?.height}
      alt={artwork?.alt_text}
      onClick={() => setLightboxIsOpen(true)}
      className='
        cursor-pointer
      '
    />
    <h1
      className='
          font-bold
          text-3xl
        '
    >
      {artwork.title}
    </h1>
    <Link
      href={route('artists.show', artwork.users[0].id)}
    >
      <h2
        className='
            font-bold
            text-xl
          '
      >
        {artwork.users[0].name}
      </h2>
    </Link>
    <p
      className='
        '
    >
      {artwork.description}
    </p>

    {lightboxIsOpen && (
      <Lightbox
        mainSrc={getImageFromDisk(artwork?.path)}
        onCloseRequest={() => setLightboxIsOpen(false)}
      />
    )}
  </div>
}

export default function Show({ auth, artwork }) {
  console.log(artwork);
  const isArtist = artwork.users[0].id === auth?.user?.id;

  return (
    <div>
      <Link
        href={route('artworks.index')}
        className='
          btn
          text-lg
          gap-2
        '
      >
        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
        Back
      </Link>

      <ArtworkInfo artwork={artwork} />

      <ul>
        {artwork?.tags && artwork.tags.map((tag) => (
          <TagDisplay tag={tag} />
        ))}
      </ul>

      {isArtist && (
        <>
          <Link
            className='btn btn-primary'
            href={route('artworks.edit', artwork.id)}
          >
            Edit
          </Link>
          <DeleteModal artwork={artwork} />
        </>
      )}
    </div>
  )
}