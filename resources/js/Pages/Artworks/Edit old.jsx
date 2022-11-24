import React, { useRef, useState } from 'react'
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
      <div className='mx-5'>
        <h1 className='font-bold text-3xl mb-3'>Edit Artwork</h1>
        <form 
          onSubmit={submit}
          className='
            form-control
            w-full
          '
        >
          <label 
            htmlFor="image"
            className='
              label
          '>
            <span className='label-text'>
              Image of Artwork
            </span>
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/png, image/jpeg"
            onChange={e => setData('image', e.target.files[0])}
            ref={fileInputRef}
            className='
              file-input 
              file-input-bordered
            '
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
          <InputError message={errors.image} className="mt-2" />

          <label htmlFor="title">Title</label>
          <input
            value={data.title}
            type="text"
            id="title"
            onChange={e => setData('title', e.target.value)}
            className='input input-bordered'
          />
          <InputError message={errors.title} className="mt-2" />

          <label htmlFor="date">Date</label>
          <input
            value={data.date}
            type="date"
            name="date"
            id="date"
            onChange={e => setData('date', e.target.value)}
          />
          <InputError message={errors.date} className="mt-2" />

          <textarea
            value={data.description}
            placeholder="Describe your artwork"
            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            onChange={e => setData('description', e.target.value)}
          ></textarea>
          <InputError message={errors.description} className="mt-2" />

          <PrimaryButton className="mt-4" processing={processing}>Edit Artwork</PrimaryButton>

        </form>

        { /* Tags form */ }
        <form
          onSubmit={addTag}
        >
          <label htmlFor="">Tags</label>
          <input 
            type="text" 
            id='tag'
            name='tag'
            value={tagInput}
            onChange={(e) => { setTagInput(e.target.value) }}
          />
          <button 
            type="submit"
            className='
              btn
              btn-rounded
            '
          >
            Add Tag
          </button>
        </form>

        { /* Tag output */ }
        <output>
          {data.tags.map((tag) => (
            <button 
              className="
                badge
              "
              key={tag}
              onClick={removeTag}
              value={tag}
            >
              {tag}
            </button>
          ))}
        </output>

        {/* <button
          onClick={() => {
            reset();
            fileInputRef.current.value = null;

            setTagInput('');
            setData('tags', []);
          }}
          className='btn'
        >
          Reset Fields
        </button> */}
      </div>
    </>
  )
}
