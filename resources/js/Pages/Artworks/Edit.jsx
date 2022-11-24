import React, { useRef, useState } from 'react'
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/inertia-react';
import { getImageFromDisk } from '../../Utils';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import 'tw-elements';

export default function Edit({ auth, artwork }) {
  const {
    data,
    setData,
    patch,
    processing,
    reset,
    errors,
    progress,
  } = useForm({
    title: artwork?.title || '',
    description: artwork?.description || '',
    image: null,
    date: artwork?.date || '',
    tags: artwork?.tags.map((tag) => (
      tag?.name
    )) || [],
  });

  // We use an input ref so we can manually reset file input
  const fileInputRef = useRef(null);

  const [tagInput, setTagInput] = useState('');

  console.log(artwork);

  /** FUNCTIONS */
  const submit = (e) => {
    e.preventDefault();
    patch(route('artworks.update', artwork.id), { onSuccess: () => reset() });
  };

  const addTag = (e) => {
    e.preventDefault();

    if (data.tags.includes(tagInput)) return;

    setData('tags', [...data.tags, tagInput]);
    setTagInput('');
  }

  const removeTag = (e) => {
    setData('tags', data.tags.filter((tag) => (
      tag !== e.target.value
    )));
  }

  return (
    <>
      <Head title="Edit Artwork" />
      <h1 className='font-bold text-3xl mb-3 text-center'>Edit Artwork</h1>
      {/* <div className='
        flex
        flex-col
        w-full
        h-max
        lg:flex-row
        mt-5
        px-10
        gap-10
      '> */}
      <div className='
        w-full
        h-max
        lg:grid
        mt-5
        px-10
        gap-10
        grid-cols-2
      '>
        <LeftCard />
        <RightCard artwork={artwork} data={data} />
      </div>
    </>
  )
}

function LeftCard() {
  return (
    <div className='
      flex-none
      h-fit
      basis-1/2
      card
      bg-base-300
      rounded-box
    '>
      Stuff
    </div>
  )
}

function RightCard({ artwork, data }) {
  return (
    <div className='
      flex-none
      basis-1/2
      card
      bg-base-300
      rounded-box
      object-contain
      overflow-clip
    '>
      <img
        src={data.image ? (
          URL.createObjectURL(data.image)
          ) : getImageFromDisk(artwork.path)}
        className='
          w-full
          h-full
        '
      />
    </div>

  )
}