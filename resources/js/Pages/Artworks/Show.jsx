import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from '@inertiajs/inertia-react';
import React, { useState } from 'react'
import { getImageFromDisk } from '../../Utils';
import Lightbox from 'react-18-image-lightbox';

// Fixes weird bug in Lightbox where global is not defined
window.global = window;

function DeleteModal({ artwork }) {
  return (
    <>
      <label 
        htmlFor="delete-modal" 
        className="
          text-lg
          transition-all
          cursor-pointer
          hover:text-primary
        "
      >
        <FontAwesomeIcon icon={faTrash} />
      </label>

      <input type="checkbox" id="delete-modal" className="modal-toggle" />
      <label
        htmlFor='delete-modal'
        className="modal modal-bottom sm:modal-middle"
      >
        <label className="modal-box relative">
          <h3 className="font-bold text-2xl">Do you wish to delete?</h3>
          <p className='my-2'>This action cannot be undone.</p>
          <div
            className='
              mt-6
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
        badge-lg
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

function ArtworkInfo({ artwork, isArtist }) {
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);

  return <div>
    <div className='
      w-full
      grid
      place-items-center
    '>
      <div className='
        p-10
        rounded-3xl
        bg-base-300
        w-4/5
        h-[750px]
        grid
        place-items-center
      '>
        <img
          src={getImageFromDisk(artwork?.path)}
          width={artwork?.width}
          height={artwork?.height}
          alt={artwork?.alt_text}
          onClick={() => setLightboxIsOpen(true)}
          className='
            cursor-zoom-in
            object-contain
            w-full
            h-full
          '
        />
      </div>

    </div>
    <div className='flex gap-5 items-center mt-5'>
      <h1
        className='
            font-bold
            text-3xl
          '
      >
        {artwork.title}
      </h1>

      {isArtist && (
        <div className='
          flex
          items-center
          gap-4
        '>
          <Link
            href={route('artworks.edit', artwork.id)}
            className='
              text-lg
              transition-all
              hover:text-primary
            '
          >
            <FontAwesomeIcon icon={faEdit} />
          </Link>
          <DeleteModal artwork={artwork} />
        </div>
      )}
    </div>
    <Link
      href={route('artists.show', artwork.users[0].id)}
    >
      <h2
        className='
            font-bold
            text-xl
            underline
            mt-2
            mb-3
          '
      >
        {artwork.users[0].name}
      </h2>
    </Link>
    <p className='mb-3'>
      {artwork.date}
    </p>
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
    <div className='
      m-5
    '>
      <Link
        href={route('artworks.index')}
        className='
          btn
          text-lg
          gap-2
          mb-5
        '
      >
        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
        Back
      </Link>

      <ArtworkInfo artwork={artwork} isArtist={isArtist} />

      <ul className='
        flex
        gap-1
        my-5
      '>
        {artwork?.tags && artwork.tags.map((tag) => (
          <TagDisplay tag={tag} key={tag?.name} />
        ))}
      </ul>

    </div>
  )
}