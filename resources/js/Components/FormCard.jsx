import React, { useState } from 'react';
import InputError from '@/Components/InputError';
import { FormTextInput } from '@/Components/FormTextInput';

export function FormCard({ 
  data, 
  setData, 
  errors, 
  onSubmit, 
  uploadRequired = false,
}) {
  const [tagInput, setTagInput] = useState('');

  const addTag = (e) => {
    e.preventDefault();

    if (data.tags.includes(tagInput))
      return;

    setData('tags', [...data.tags, tagInput]);
    setTagInput('');
  };

  const removeTag = (e) => {
    setData('tags', data.tags.filter((tag) => (
      tag !== e.target.value
    )));
  };

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

        {/* File Input */}
        <div>
          <label className="label" htmlFor='image'>
            <span className="label-text">
              {uploadRequired && (
                <span className='text-secondary text-lg'>
                  *
                </span>
              )}
              Upload Artwork Image (Max. 10MB)
            </span>
          </label>
          <input
            id='image'
            title='image'
            name='image'
            accept='image/*'
            type="file"
            required={uploadRequired}
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
          required />

        <FormTextInput
          value={data.date}
          id='date'
          title='Date Completed'
          label='Date Completed'
          onChange={e => setData('date', e.target.value)}
          error={errors.date}
          type='date'
          required />

        {/* Description */}
        <div>
          <label className="label" htmlFor='desc'>
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
          error={errors.alt_text} />
      </form>

      {/* Making another form to handle Tag inputs
                 This allows users to simply press Enter to
                 add a new tag since you cannot have a form in a form */}
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
          <div className="
            flex
            flex-col
            gap-2
            sm:flex-row
            sm:input-group 
            sm:gap-0
          ">
            <input
              type="text"
              className="input input-bordered"
              id='tag'
              name='tag'
              value={tagInput}
              onChange={(e) => {
                 if (e?.target?.value) 
                  setTagInput(e?.target?.value); 
              }} />
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

      {/* Tag output */}
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
          flex
          justify-end
      '>
        <button
          type="submit"
          form='artwork-form'
          className='
           btn
           btn-primary
           btn-rounded
           z-50
          '
        >
          Submit
        </button>
      </div>

    </div>
  );
}
