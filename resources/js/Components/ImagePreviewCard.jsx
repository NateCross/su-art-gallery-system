import React from 'react';
import { getImageFromDisk } from '@/Utils';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ImagePreviewCard({ artwork, data }) {
  return (
    <div className='
      flex-none
      basis-1/2
      card
      bg-base-300
      rounded-box
      object-contain
      overflow-clip
      relative
      h-fit
    '>
      { data?.image || artwork?.path ? <>
        <p
          className='
            absolute
            top-4
            left-4
            font-bold
            text-2xl
            text-stroke
            text-white
          '
        >
          Preview
        </p>
        <img
          src={data?.image ? (
            URL.createObjectURL(data.image)
          ) : (
            getImageFromDisk(artwork.path)
          )}
          className='
            h-full
            w-auto
          '/>
      </> : (
        <div className='
            h-52
            grid
            place-items-center
          '
        >
          <FontAwesomeIcon
            icon={faImage}
            className='
              text-7xl
            '
          />
        </div>
      )}
    </div>

  );
}
