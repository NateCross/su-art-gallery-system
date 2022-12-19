import React from 'react';
import InputError from '@/Components/InputError';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export function FormTextInput({
  onChange, label, placeholder = null, id, title, value, error, required = false, type = 'text', autoComplete = null,
}) {
  return <div className='w-full'>

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
        autoComplete={autoComplete}
        className={`
          input 
          input-bordered 
          w-full 
        `}
        required={required} />
    </div>

    <InputError message={error} className="mt-2" />

  </div>;
}
