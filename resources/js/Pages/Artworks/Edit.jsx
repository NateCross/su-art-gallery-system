import React, { useRef } from 'react'
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/inertia-react';
import 'tw-elements';
import { FormCard } from '../../Components/FormCard';
import { ImagePreviewCard } from '@/Components/ImagePreviewCard';

export default function Edit({ auth, artwork }) {
  const {
    data,
    setData,
    post,
    processing,
    reset,
    errors,
    progress,
  } = useForm({
    title: artwork?.title || '',
    description: artwork?.description || '',
    image: null,
    alt_text: artwork?.alt_text || '',
    date: artwork?.date || '',
    tags: artwork?.tags.map((tag) => (
      tag?.name
    )) || [],
    _method: 'patch',
  });

  // We use an input ref so we can manually reset file input
  // const fileInputRef = useRef(null);

  /** FUNCTIONS */
  const submit = (e) => {
    e.preventDefault();
    post(route('artworks.update', artwork.id), { 
      // Spoofing the patch method since patch cannot upload
      // files. This way, we can patch while uploading
      onSuccess: () => reset(),
      
    });
  };

  return (
    <>
      <Head title="Edit Artwork" />
      <h1 className='font-bold text-3xl mb-3 text-center'>Edit Artwork</h1>
      <div className='
        w-full
        h-max
        mt-5
        px-10
        gap-10
        flex
        flex-col
        items-center
        justify-center
      '>
        <FormCard
          data={data}
          setData={setData}
          onSubmit={submit}
          errors={errors}
          artwork={artwork}
        />
      </div>
    </>
  )
}