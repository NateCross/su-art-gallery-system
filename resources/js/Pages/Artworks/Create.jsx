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
    title: '',
    description: '',
    image: null,
    alt_text: '',
    date: '',
    is_nsfw: false,
    tags: [],
  });

  /** FUNCTIONS */
  const submit = (e) => {
    e.preventDefault();
    post(route('artworks.store'), { onSuccess: () => reset() });
  };

  return (
    <>
      <Head title="Add Artwork" />
      <h1 className='font-bold text-3xl mb-3 text-center'>Add Artwork</h1>
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
          uploadRequired
        />
      </div>
    </>
  )
}