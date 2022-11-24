import React from 'react'
import { Gallery } from 'react-grid-gallery'
import { Link } from '@inertiajs/inertia-react';
import { Pagination } from './Pagination';

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

export default function GalleryDisplay({ artworks }) {
  const galleryArtworks = artworks.data.map((data) => (
    {
      caption: data.title,
      src: `/${data.path.replace('public', 'storage')}`,
      height: data.height,
      width: data.width,
      alt: data.alt_text,
      href: route('artworks.show', data.id),
      tags: data.tags.map((tag) => (
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
        <div
          className='
            absolute
            w-full
            h-[33%]
            top-full
            transform
            -translate-y-full
            text-center
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
    <div>
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
