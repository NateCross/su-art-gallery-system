import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export function Pagination({ links, page }) {
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
  );
}
