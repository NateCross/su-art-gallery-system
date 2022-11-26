import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export function Pagination({ links, page }) {
  // Removes the << and >> looking symbols which break screen readers
  links[0].label = 'Previous';
  links[links.length - 1].label = 'Next';

  return (
    <div className='
      btn-group
      w-full
      flex
      items-center
      justify-center
    '>
      {links.map((link, index) => {
        if (
          (index === 0 
          || index === links.length - 1)
          || (page - 2 <= index && index <= page + 2)
        ) return <Link
            href={link.url}
            key={index}
            className={`
              btn
              ${page === index ? 'btn-active' : ''}
            `}
          >
            {link?.label}
          </Link>
      })}
    </div>
  );
}
