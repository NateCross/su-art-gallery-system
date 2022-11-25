import React, { useRef, useState } from 'react'
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/inertia-react';
import { getImageFromDisk } from '../../Utils';
import { faImage, faCalendar } from '@fortawesome/free-solid-svg-icons';
import 'tw-elements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    alt_text: artwork?.alt_text || '',
    date: artwork?.date || '',
    tags: artwork?.tags.map((tag) => (
      tag?.name
    )) || [],
  });

  // We use an input ref so we can manually reset file input
  // const fileInputRef = useRef(null);


  console.log(artwork);

  /** FUNCTIONS */
  const submit = (e) => {
    e.preventDefault();
    patch(route('artworks.update', artwork.id), { onSuccess: () => reset() });
  };


  return (
    <>
      <Head title="Edit Artwork" />
      <h1 className='font-bold text-3xl mb-3 text-center'>Edit Artwork</h1>
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
        />
        <ImagePreviewCard artwork={artwork} data={data} />
      </div>
    </>
  )
}

function FormTextInput({
  onChange,
  label,
  placeholder = null,
  id,
  title,
  value,
  error,
  required = false,
  type = 'text',
}) {
  return <div>

    <label htmlFor={id} className='label'>
      <span className='label-text'>
        {required && (
          <span className='text-secondary text-lg'>
            *
          </span>
        )}
        {label}
      </span>
    </label>

    <div className={`
      relative
      ${type == 'date' ? 'max-w-[10rem]' : 'max-w-lg'}
    `}>
      <input
        type={type}
        id={id}
        title={title}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`
          input 
          input-bordered 
          w-full 
        `}
        required={required}
      />
      {type === 'date' && (
        <FontAwesomeIcon
          icon={faCalendar}
          className='
            absolute
            right-3
            top-1/2
            transform
            -translate-y-1/2
            pointer-events-none
          '
        />
      )}
    </div>

    <InputError message={error} className="mt-2" />

  </div>
}

function FormCard({ data, setData, errors, onSubmit }) {
  const [tagInput, setTagInput] = useState('');

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
    <div className='
      flex-none
      h-fit
      basis-1/2
      card
      bg-base-300
      rounded-box
    '>
      <form
        id='artwork-form'
        onSubmit={onSubmit}
        className='
          m-5
          form-control 
          max-w-lg
          gap-2
          mb-0
      '>

        { /* File Input */}
        <div>
          <label className="label" htmlFor='image' >
            <span className="label-text">Upload Artwork Image</span>
          </label>
          <input
            id='image'
            title='image'
            name='image'
            accept='image/*'
            type="file"
            onChange={e => setData('image', e.target.files[0])}
            className="
              file-input 
              file-input-bordered 
              w-full
              max-w-xs
          "/>
          <InputError message={errors.image} className="mt-2" />
        </div>

        <FormTextInput
          value={data.title}
          id='title'
          title='Artwork Title'
          label='Title'
          onChange={e => setData('title', e.target.value)}
          error={errors.title}
          required
        />

        <FormTextInput
          value={data.date}
          id='date'
          title='Date Completed'
          label='Date Completed'
          onChange={e => setData('date', e.target.value)}
          error={errors.date}
          type='date'
          required
        />

        { /* Description */}
        <div>
          <label className="label" htmlFor='desc' >
            <span className="label-text">Description</span>
          </label>
          <textarea
            id='desc'
            title='Description'
            value={data.description}
            onChange={e => setData('description', e.target.value)}
            placeholder="Describe your artwork"
            rows='5'
            className="
              textarea
              textarea-bordered
              max-w-lg
              w-full
          "/>
          <InputError message={errors.description} className="mt-2" />
        </div>

        <FormTextInput
          value={data.alt_text}
          id='alt'
          title='Artwork Alt. Text'
          label='Alt. Text'
          onChange={e => setData('alt_text', e.target.value)}
          error={errors.alt_text}
        />
      </form>

      { /* Making another form to handle Tag inputs 
           This allows users to simply press Enter to 
           add a new tag since you cannot have a form in a form */ }
      <form
        onSubmit={addTag}
        className='
          m-5
          form-control 
          max-w-lg
          gap-2
          mt-2
      '>
        <div>
          <label htmlFor="tag" className='label'>
            <span className="label-text">Tags</span>
          </label>
          <div className="input-group">
            <input
              type="text"
              className="input input-bordered"
              id='tag'
              name='tag'
              value={tagInput}
              onChange={(e) => { setTagInput(e.target.value) }}
            />
            <button
              type="submit"
              className='
              btn
              max-w-fit
            '
            >
              Add Tag
            </button>
          </div>
        </div>
      </form>

      { /* Tag output */ }
      <output
        className='
           mx-5
           flex
           gap-2
           flex-wrap
        '
      >
        {data.tags.map((tag) => (
          <button 
            className="
              badge
              text-lg
              hover:text-primary-focus
            "
            key={tag}
            onClick={removeTag}
            value={tag}
            title='Click me to remove!'
          >
            {tag}
          </button>
        ))}
      </output>

      <div
        className='
          m-5
      '>
        <button
          type="submit"
          form='artwork-form'
          className='
           btn
           btn-primary
           btn-rounded
          '
        >
          Submit
        </button>
      </div>

    </div>
  )
}

function ImagePreviewCard({ artwork, data }) {
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
      <p
        className='
          absolute
          top-[1%]
          left-[2.5%]
          font-bold
          text-2xl
          text-stroke
          text-white
        '
      >
        Preview
      </p>
      <img
        src={data.image ? (
          URL.createObjectURL(data.image)
        ) : getImageFromDisk(artwork.path)}
        className='
          h-full
          w-auto
        '
      />
    </div>

  )
}