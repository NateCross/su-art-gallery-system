import React from 'react'
import { Gallery } from 'react-grid-gallery'
import { Link } from '@inertiajs/inertia-react';
import { Pagination } from './Pagination';

function ImageComponent(props) {
  console.log(props.item);
  return (
    <Link
      href={props.item.href}
      target='_blank'
      className='
      '
    >
      {props?.item?.is_nsfw === 1 && (
        <div className='
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          z-50
          p-2
          bg-error
          font-bold
          text-xl
          rounded-xl
        '>
          NSFW
        </div>
      )}
      <img 
        {...props.imageProps} 
        style={{
          filter: props?.item?.is_nsfw === 1 && (
            'blur(10px)'
          )
        }}
      />
    </Link>
  )
}

export default function GalleryDisplay({ auth, artworks }) {
  if (artworks.data.length <= 0) return;
  console.log(auth);

  const galleryArtworks = artworks.data.map((data) => (
    {
      caption: data.title,
      src: `/${data.thumbnail.replace('public', 'storage')}`,
      height: data.thumbnail_height,
      width: data.thumbnail_width,
      alt: data.alt_text,
      href: route('artworks.show', data.id),
      is_nsfw: !auth?.user?.nsfw_enabled && data?.is_nsfw,
      tags: (!data?.is_nsfw || auth?.user?.nsfw_enabled) && data.tags.map((tag) => (
        {
          value: (
            <Link
              href={route('tags.show', tag.id)}
            >
              {tag.name}
            </Link>
          ),
          title: tag.name,
        }
      )),
      thumbnailCaption: (
        <div className='
          sm:hidden
          top-full
          transform
          -translate-y-full
          absolute
          z-50
          bg-neutral
          w-full
          px-3
          py-1
          text-neutral-content
        '>
          <p
            className='
              font-bold
              text-lg
            '
          >
            {data.title}
          </p>
          <p>
            {data.users[0].name}
          </p>
        </div>),
      customOverlay: <div className='relative w-full h-full hidden sm:block'>
        <div className='
          w-full
          h-full
          text-red-500
          bg-gradient-to-t
          from-black
          opacity-[15%]
          transition-all
          absolute
          z-50
        '>
        </div>
        <div
          className='
            absolute
            w-full
            h-[33%]
            top-full
            transform
            -translate-y-full
            text-center
            z-50
        '>
          <p
            className='
              font-bold
              text-primary-content
              truncate
              text-stroke
              break-all
              mx-1
              text-xl
          '>
            {data.title}
          </p>

          <p
            className='
              text-primary-content
              truncate
              text-stroke
              break-all
              mx-1
          '>
            {data.users[0].name}
          </p>
        </div>

      </div>
    }
  ));
  return <div>
    <div className='my-5'>
      <Gallery
        images={galleryArtworks}
        enableImageSelection={false}
        thumbnailImageComponent={ImageComponent}
        rowHeight='360'
        margin={4}
        tagStyle={{
          display: "inline",
          padding: ".2em .6em .3em",
          fontSize: "75%",
          fontWeight: "800",
          lineHeight: "1",
          color: "hsl(var(--pc))",
          background: "rgba(0,0,0,0.65)",
          textAlign: "center",
          whiteSpace: "nowrap",
          verticalAlign: "baseline",
          borderRadius: "1.9rem",
          transition: "all 0.15s",
        }}
      />

    </div>

    <Pagination links={artworks?.links} page={artworks?.current_page} />
  </div>
}
