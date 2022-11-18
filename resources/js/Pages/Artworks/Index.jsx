import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/inertia-react';

function Artwork({ data }) {
  return (
    <li>
      <h2>{data?.title}</h2>
      <p>By {data?.users[0]?.name}</p>
      <img src={`/${data?.path.replace('public', 'storage')}`} alt="" />
    </li>
  )
}

function Pagination({ links }) {
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
            text-lg
          `}
        >{link?.label}</Link>
      ))}
    </>
  )
}

export default function Index({ auth, artworks }) {
  console.log(artworks);
  return (
    <AuthenticatedLayout auth={auth}>
      <Head title="Artworks" />

      <h1>Artworks</h1>
      <ul>
        {artworks.data.map((data) => (
          <Artwork data={data} key={data?.title} />
        ))}
      </ul>
      <div>
        <Pagination links={artworks?.links} />
      </div>

    </AuthenticatedLayout>
  )
}
