import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from '@inertiajs/inertia-react';
import React, { useState } from 'react'
import { getImageFromDisk } from '../../Utils';
import Lightbox from 'react-18-image-lightbox';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/inertia-react';

// Fixes weird bug in Lightbox where global is not defined
window.global = window;

// When you exit while in the Lightbox, the scroll is still
// frozen. This prevents that.
Inertia.on('navigate', () => {
  document.body.style.overflow = '';
});

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

function ArtworkImage({ artwork }) {
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  return <>
    <div className='
      grid
      place-items-center
    '>
      <div className='
        p-5
        rounded-3xl
        grid
        place-items-center
        grid-cols-1
        bg-base-300
        h-fit
        w-fit
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
            sm:max-h-[75vh]
          '
        />
      </div>

    {lightboxIsOpen && (
      <Lightbox
        mainSrc={getImageFromDisk(artwork?.path)}
        onCloseRequest={() => {
          setLightboxIsOpen(false);
          document.body.style.overflow = '';
        }}
        onAfterOpen={() => {
          document.body.style.overflow = 'hidden';
        }}
      />
    )}
    </div>
  </>
}

function ArtworkInfo({ artwork, isArtist }) {
  return <div>
    <div className='flex gap-x-5 items-center mt-5 flex-wrap'>
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
          flex-wrap
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

    <div className='mb-3'>
      {artwork?.is_nsfw === 1 && (
        <div className='
          badge
          badge-error
        '>
          NSFW
        </div>
      )}
    </div>

    <div className='
      overflow-y-auto
      max-h-[40vh]
    '>
      <p
        className='
            prose
          '
      >
        {artwork.description}
      </p>
    </div>

    <ul className='
      flex
      flex-wrap
      gap-1
      my-5
    '>
      {artwork?.tags && artwork.tags.map((tag) => (
        <TagDisplay tag={tag} key={tag?.name} />
      ))}
    </ul>

  </div>
}

export default function Show({ auth, artwork }) {
  const isArtist = artwork.users[0].id === auth?.user?.id;

  return <>
    <Head title={artwork?.title} />

    <div className='
      m-5
      flex
      flex-col-reverse
      sm:flex-row
    '>
      <div className='
        sm:basis-1/4
      '>
        <Link
          href={route('artworks.index')}
          className='
            btn
            text-lg
            gap-2
            mb-5
            hidden
            align-middle
            w-fit
            sm:flex
          '
        >
          <FontAwesomeIcon icon={faArrowAltCircleLeft} />
          Back
        </Link>

        <ArtworkInfo artwork={artwork} isArtist={isArtist} />
      </div>
      <div className='hidden sm:divider sm:divider-horizontal' ></div>
      <div className='
        sm:basis-2/3
        flex-wrap
        min-w-0
        max-w-full
      '>
        <ArtworkImage artwork={artwork} />
      </div>

      <Link
        href={route('artworks.index')}
        className='
          btn
          text-lg
          gap-2
          mb-5
          sm:hidden
          w-fit
        '
      >
        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
        Back
      </Link>
    </div>
  </>
}