import React, { forwardRef, useEffect, useRef } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import InputError from '@/Components/InputError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const SearchDropdown = forwardRef(({ children }, ref) => {
  return (
    <div 
      className="dropdown dropdown-end"
      ref={ref}
    >
      <label 
        tabIndex={0} 
        className="
          btn 
          btn-ghost
          btn-circle
          text-xl
          focus:text-primary
        "
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </label>
      <div 
        tabIndex={0}
        className='
          dropdown-content
          p-2
          shadow 
          bg-base-300 
          rounded-box 
          mt-4
        '
      >
        {children}
      </div>
      {/* <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Item 1</a></li>
        <li><a>Item 2</a></li>
      </ul> */}
    </div>
  )
})

export function Search() {
  const searchOptions = {
    'Artwork': 'search.artworks',
    'Artist': 'search.artists',
    // 'Tag': 'search.tags',
  };

  const { data, setData, processing, errors, get } = useForm({
    search: '',
    option: searchOptions['Artwork'],
  });
  const dropdown = useRef();

  function submit(e) {
    e.preventDefault();
    dropdown.current.blur();
    get(route(data.option), data.search);
  }

  return (
    <SearchDropdown ref={dropdown}>

    <form 
      onSubmit={submit}
      className='relative hidden sm:inline-flex input-group'
    >
      <input
        type="search"
        id='search'
        placeholder='Search'
        className='
          input 
          input-bordered 
          w-full
          max-w-xs
          min-w-[20rem]
          focus:outline-none
        '
        value={data?.search}
        onChange={(e) => { setData('search', e.target.value); }} />
      <InputError message={errors.search} />

      <select
        required
        name='option'
        className='
          select
          select-bordered
          focus:outline-none
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
          px-3
          btn
          transition-all
          hover:text-primary
          focus:text-primary
        '
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </form>

    </SearchDropdown>
  );
}

