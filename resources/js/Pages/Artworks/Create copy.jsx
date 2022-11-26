import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/inertia-react';

export default function Create({ auth }) {
  const { data, setData, post, processing, reset, errors, progress } = useForm({
    title: '',
    description: '',
    image: null,
    date: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('artworks.store'), { onSuccess: () => reset() });
  };

  return (
    <AuthenticatedLayout auth={auth}>
      <Head title="Create Artwork" />

      <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <form onSubmit={submit}>

          { /* Artwork upload */ }
          <label htmlFor="image">Image of Artwork</label>
          <input 
            type="file" 
            name="image" 
            id="image" 
            accept="image/png, image/jpeg"
            onChange={e => setData('image', e.target.files[0])}
          />
          {progress && (
            <progress value={progress.percentage} max="100">
              {progress.percentage}%
            </progress>
          )}
          {data.image && (
            <img src={URL.createObjectURL(data.image)}/>
          )}
          <InputError message={errors.image} className="mt-2" />

          <label htmlFor="title">Title</label>
          <input 
            value={data.title}
            type="text" 
            id="title" 
            onChange={e => setData('title', e.target.value)}
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
          <PrimaryButton className="mt-4" processing={processing}>Upload Artwork</PrimaryButton>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}