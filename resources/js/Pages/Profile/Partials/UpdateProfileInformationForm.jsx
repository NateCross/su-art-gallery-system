import React, { useEffect, useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/inertia-react';
import { Transition } from '@headlessui/react';
import { FormTextInput } from '@/Components/FormTextInput';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className }) {
  const user = usePage().props.auth.user;

  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    name: user.name,
    email: user.email,
  });

  const submit = (e) => {
    e.preventDefault();
    patch(route('profile.update'));
  };

  return (
    <section className={className}>
      <header className='text-base-content'>
        <h2 className="text-lg font-medium">Profile Information</h2>

        <p className="mt-1 text-sm">
          Update your account's name and email address.
        </p>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6">
        <div>
          <FormTextInput
            id='name'
            value={data.name}
            onChange={e => setData('name', e.target.value)}
            title='name'
            label='Name'
            autoComplete='name'
            error={errors.name}
          />
          {/* <InputLabel for="name" value="Name" />

          <TextInput
            id="name"
            type="text"
            className="mt-1 block w-full"
            value={data.name}
            handleChange={(e) => setData('name', e.target.value)}
            required
            autofocus
            autocomplete="name"
          />

          <InputError className="mt-2" message={errors.name} /> */}
        </div>

        <div>

          <FormTextInput
            id='email'
            type='email'
            value={data.email}
            onChange={e => setData('email', e.target.value)}
            title='Email'
            label='Email Address'
            autoComplete='email'
            error={errors.email}
          />
        </div>

        {mustVerifyEmail && user.email_verified_at === null && (
          <div>
            <p className="text-sm mt-2 text-gray-800">
              Your email address is unverified.
              <Link
                href={route('verification.send')}
                method="post"
                as="button"
                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Click here to re-send the verification email.
              </Link>
            </p>

            {status === 'verification-link-sent' && (
              <div className="mt-2 font-medium text-sm text-green-600">
                A new verification link has been sent to your email address.
              </div>
            )}
          </div>
        )}

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
