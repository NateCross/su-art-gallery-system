import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/inertia-react';

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
          `}
        >{link?.label}</Link>
      ))}
    </>
  )
}

export default function Index({ auth, artworks }) {
  console.log(artworks);
  return (
    <>
      { /* <AuthenticatedLayout auth={auth}> */ }
      <Head title="Artworks" />

      <h1>Artworks</h1>
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
