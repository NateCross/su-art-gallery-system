import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import InputError from '@/Components/InputError';
// import { useForm } from '@inertiajs/inertia';

function Artwork({ data }) {
  return (
    <li>
      <Link
        href={`/artworks/${data.id}`}
      >
        <h2>{data?.title}</h2>
        <p>By {data?.users[0]?.name}</p>
        <img src={`/${data?.path.replace('public', 'storage')}`} alt="" />
      </Link>
    </li>
  )
}

function Pagination({ links, page }) {
  // Removes the << and >> looking symbols which break screen readers
  links[0].label = 'Previous';
  links[links.length - 1].label = 'Next';

  return (
    <>
      {links.map((link, index) => (
        <Link 
          href={link.url} 
          key={index}
          className={`
            btn
            ${page === index ? 'btn-active' : ''}
            ${index === 0 || index === links.length - 1 ? 'mx-5' : ''}
          `}
        >{link?.label}</Link>
      ))}
    </>
  )
}

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
