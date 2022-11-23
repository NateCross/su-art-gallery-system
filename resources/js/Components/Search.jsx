import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import InputError from '@/Components/InputError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export function Search() {
  const searchOptions = {
    'Artwork': 'search.artworks',
    // 'Artist': 'search.artists',
    // 'Tag': 'search.tags',
  };

  const { data, setData, processing, errors, get } = useForm({
    search: '',
    option: searchOptions['Artwork'],
  });

  function submit(e) {
    e.preventDefault();
    get(route(data.option), data.search);
  }


  return (
    <form 
      onSubmit={submit}
      className='relative hidden sm:inline-flex sm:gap-2'
    >
      <input
        type="search"
        id='search'
        placeholder='Search'
        className='
          input 
          input-bordered 
          input-primary 
          w-full
          max-w-xs
        '
        value={data?.search}
        onChange={(e) => { setData('search', e.target.value); }} />
      <InputError message={errors.search} />

      <select
        required
        name='option'
        className='
          select
          select-ghost
        '
        title='Query to Search'
        value={data?.option}
        onChange={(e) => { setData('option', e.target.value); }}
      >
        {Object.entries(searchOptions).map(([key, value]) => (
          <option key={key} value={value}>{key}</option>
        ))}
      </select>
      <InputError message={errors.option} />

      <button 
        type="submit"
        className='
          flex
          items-center
          pr-3
          transition-all
          hover:text-primary
          focus:text-primary
        '
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
}
