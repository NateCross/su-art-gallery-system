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
        lg:grid
        mt-5
        px-10
        gap-10
        lg:grid-cols-2
        flex
        flex-col
      '>
        <FormCard
          data={data}
          setData={setData}
          onSubmit={submit}
          errors={errors}
          uploadRequired
        />
        <ImagePreviewCard artwork={artwork} data={data} />
      </div>
    </>
  )
}