import React from 'react'
import { Head, Link } from '@inertiajs/inertia-react';
import { Artwork } from '../../Components/Artwork';
import { Pagination } from '../../Components/Pagination';
import { Gallery } from 'react-grid-gallery';

function ImageComponent(props) {
  return (
    <Link
      href={props.item.href} 
      target='_blank'
      className='
      '
    >
      <img {...props.imageProps} />
    </Link>
  )
}

export default function Index({ auth, artworks }) {
  console.log(artworks);
  const searchParams = new URLSearchParams(window.location.search);
  const searchQuery = searchParams.get('search');

  const galleryArtworks = artworks.data.map((data) => (
    {
      caption: data.title,
      src: `/${data.path.replace('public', 'storage')}`,
      height: data.height,
      width: data.width,
      alt: data.alt_text,
      href: route('artworks.show', data.id),
      customOverlay: <div className='relative w-full h-full'>
        <div className='
          w-full
          h-full
          text-red-500
          bg-gradient-to-t
          from-black
          opacity-[15%]
          transition-all
          absolute
        '>
        </div>

        <p
          className='
            opacity-100
            absolute
            font-bold
            text-primary-content
            top-3/4 
            left-1/2 
            transform 
            -translate-x-1/2 
            -translate-y-3/4
            text-left
            truncate
            text-stroke
            break-all
          '
        >
          {data.title}
        </p>

        <p
          className='
            opacity-100
            absolute
            text-primary-content
            top-[90%]
            left-1/2 
            transform 
            -translate-x-1/2 
            -translate-y-[90%]
            text-left
            truncate
            text-stroke
            break-all
          '
        >
          {data.users[0].name}
        </p>
      </div>
    }
  ));

  return (
    <>
      <Head title="Artworks" />

      <Link
        className={`
          btn btn-primary ${!auth?.user ? 'invisible' : ''}
        `}
        href='/artworks/create'
      >
        Add Artwork
      </Link>
      {/* <ul>
        {artworks.data.map((data) => (
          <Artwork data={data} key={data?.title} />
        ))}
      </ul> */}
      <div
        className='
          flex
          items-center
          justify-center
        '
      >
        <Gallery 
          images={galleryArtworks} 
          enableImageSelection={false}
          thumbnailImageComponent={ImageComponent}
        />
      </div>
      <div className='btn-group'>
        <Pagination links={artworks?.links} page={artworks?.current_page} />
      </div>
    </>
  )
}
