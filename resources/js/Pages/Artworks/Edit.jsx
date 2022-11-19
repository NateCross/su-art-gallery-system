import React, { useRef } from 'react'
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/inertia-react';
import { getImageFromDisk } from '../../Utils';
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
    title: '',
    description: '',
    image: null,
    date: '',
  });

  // We use an input ref so we can manually reset file input
  const fileInputRef = useRef(null);

  console.log(artwork);

  /** FUNCTIONS */
  const submit = (e) => {
    e.preventDefault();
    patch(route('artworks.update', artwork.id), { onSuccess: () => reset() });
  };

  return (
    <>
      <Head title="Edit Artwork" />
      <div>
        <h1>Edit Artwork</h1>
        <form onSubmit={submit}>
          <label htmlFor="image">Image of Artwork</label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/png, image/jpeg"
            onChange={e => setData('image', e.target.files[0])}
            className='file-input file-input-bordered'
            ref={fileInputRef}
          />
          {progress && (
            <progress value={progress.percentage} max="100">
              {progress.percentage}%
            </progress>
          )}
          { /* Show current image if null, and uploaded image if not */}
          <img
            src={data.image ? (
              URL.createObjectURL(data.image)
            ) : getImageFromDisk(artwork.path)}
          />

          <label htmlFor="title">Title</label>
          <input
            value={data.title}
            type="text"
            id="title"
            onChange={e => setData('title', e.target.value)}
            className='input input-bordered'
          />

          <label htmlFor="date">Date</label>
          <input
            value={data.date}
            type="date"
            name="date"
            id="date"
            onChange={e => setData('date', e.target.value)}
          />

          <textarea
            value={data.description}
            placeholder="Describe your artwork"
            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            onChange={e => setData('description', e.target.value)}
          ></textarea>
          <InputError message={errors.description} className="mt-2" />
          <PrimaryButton className="mt-4" processing={processing}>Edit Artwork</PrimaryButton>

        </form>

        <button
          onClick={() => {
            reset();
            fileInputRef.current.value = null;
          }}
          className='btn'
        >
          Reset Fields
        </button>
      </div>
    </>
  )
}
