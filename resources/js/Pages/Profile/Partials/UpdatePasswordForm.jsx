import React, { useEffect, useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/inertia-react';
import { Transition } from '@headlessui/react';
import { FormTextInput } from '@/Components/FormTextInput';

export default function UpdatePasswordForm({ className }) {
  const passwordInput = useRef();
  const currentPasswordInput = useRef();

  const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const updatePassword = (e) => {
    e.preventDefault();
    put(route('password.update'), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: () => {
        if (errors.password) {
          reset('password', 'password_confirmation');
          // passwordInput.current.focus();
        }

        if (errors.current_password) {
          reset('current_password');
          // currentPasswordInput.current.focus();
        }
      },
    });
  };

  return (
    <section className={className}>
      <header className='text-base-content'>
        <h2 className="text-lg font-medium">Update Password</h2>

        <p className="mt-1 text-sm">
          It is advisable to secure your account with a long password.
        </p>
      </header>

      <form onSubmit={updatePassword} className="mt-6 space-y-6">
        <div>
          <FormTextInput
            id='current_password'
            label='Current Password'
            value={data.current_password}
            onChange={e => setData('current_password', e.target.value)}
            type='password'
            autoComplete='current-password'
            error={errors.current_password}
          />
        </div>

        <div>
          <FormTextInput
            id='password'
            label='New Password'
            value={data.password}
            onChange={e => setData('password', e.target.value)}
            type='password'
            autoComplete='new-password'
            error={errors.password}
          />
          {/* <InputLabel for="password" value="New Password" />

          <TextInput
            id="password"
            ref={passwordInput}
            value={data.password}
            handleChange={(e) => setData('password', e.target.value)}
            type="password"
            className="mt-1 block w-full"
            autocomplete="new-password"
          />

          <InputError message={errors.password} className="mt-2" /> */}
        </div>

        <div>
          <FormTextInput
            id='password_confirmation'
            label='Confirm Password'
            value={data.password_confirmation}
            onChange={e => setData('password_confirmation', e.target.value)}
            type='password'
            autoComplete='new-password'
            error={errors.password_confirmation}
          />
          {/* <InputLabel for="password_confirmation" value="Confirm Password" />

          <TextInput
            id="password_confirmation"
            value={data.password_confirmation}
            handleChange={(e) => setData('password_confirmation', e.target.value)}
            type="password"
            className="mt-1 block w-full"
            autocomplete="new-password"
          />

          <InputError message={errors.password_confirmation} className="mt-2" /> */}
        </div>

        <div className="flex items-center gap-4">
          <button 
            type="submit"
            className='
              btn 
              btn-primary
            '
          >
            Save
          </button>

          <Transition
            show={recentlySuccessful}
            enterFrom="opacity-0"
            leaveTo="opacity-0"
            className="transition ease-in-out"
          >
            <p className="text-sm text-base-content">Saved.</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
