import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import InputError from '@/Components/InputError';
import { Artwork } from '../../Components/Artwork';
import { Pagination } from '../../Components/Pagination';

function Search() {
  const { data, setData, processing, errors, get } = useForm({
    search: '',
    option: 'Title',
  });

  function submit(e) {
    e.preventDefault();
    get(route('artworks.index'));
  }

  const searchOptions = [
    'Title',
    'Artist',
    'Tag',
  ];

  return (
    <form onSubmit={submit}>
      <input 
        type="search" 
        id='search' 
        placeholder='Search' 
        className='input input-bordered input-primary'
        value={data?.search}
        onChange={(e) => {setData('search', e.target.value)}}
      />
      <InputError message={errors.search}/>

      <select 
        required
        name='option'
        className='select select-secondary'
        value={data?.option}
        onChange={(e) => {setData('option', e.target.value)}}
      >
        {searchOptions.map((value) => (
          <option key={value}>{value}</option>
        ))}
      </select>
      <InputError message={errors.option}/>
    </form>
  )
}

export default function Index({ auth, artworks }) {
  console.log(artworks);
  const searchParams = new URLSearchParams(window.location.search);
  const searchQuery = searchParams.get('search');

  return (
    <>
      { /* <AuthenticatedLayout auth={auth}> */ }
      <Head title="Artworks" />

      {searchQuery ? (
        <h1>Searching for {searchQuery}</h1>
      ) : (
        <h1>Artworks</h1>
      )}

      <Search />
      <Link
        className={`
          btn btn-primary ${!auth?.user ? 'invisible' : ''}
        `}
        href='/artworks/create'
      >
        Add Artwork
      </Link>
      <ul>
        {artworks.data.map((data) => (
          <Artwork data={data} key={data?.title} />
        ))}
      </ul>
      <div className='btn-group'>
        <Pagination links={artworks?.links} page={artworks?.current_page} />
      </div>
      { /* </AuthenticatedLayout> */ }
    </>
  )
}
