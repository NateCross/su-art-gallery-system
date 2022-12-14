import React, { useEffect, useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/inertia-react';
import { Transition } from '@headlessui/react';
import { FormTextInput } from '@/Components/FormTextInput';
import { getImageFromDisk } from '@/Utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className }) {
  const avatarUpload = useRef(null);

  const user = usePage().props.auth.user;

  const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
    name: user.name,
    email: user.email,
    avatar: null,
    nsfw_enabled: user?.nsfw_enabled,
    _method: 'patch', // Allow us to upload image while patching
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('profile.update'));
  };

  const clearAvatarUpload = (e) => {
    e.preventDefault();
    avatarUpload.current.value = null;
    setData('avatar', null);
  }

  return (
    <section className={className}>
      <header className='text-base-content'>
        <h2 className="text-lg font-medium">Profile Information</h2>

        <p className="mt-1 text-sm">
          Update your account's profile picture, name, NSFW filter, and email address.
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

        { /* NSFW Checkbox */ }
        <div className='flex items-center gap-1'>
          <label className="label cursor-pointer" htmlFor='nsfw_enabled'>
            <span className="label-text">
              Not Safe for Work (NSFW) Enabled
            </span>
          </label>
          <input
            id='nsfw_enabled'
            title='Enable NSFW Artworks'
            name='nsfw_enabled'
            type="checkbox"
            onChange={() => setData('nsfw_enabled', !data?.nsfw_enabled)}
            checked={data?.nsfw_enabled}
            className="
              checkbox
          "/>
          <InputError message={errors.nsfw_enabled} className="mt-2" />
        </div>

        <div className='relative'>
          <label className="label" htmlFor='image'>
            <span className="label-text">
              Upload Profile Picture
            </span>
          </label>
          <input
            id='avatar'
            title='avatar'
            name='avatar'
            accept='image/*'
            type="file"
            onChange={e => setData('avatar', e.target.files[0])}
            ref={avatarUpload}
            className="
              file-input 
              file-input-bordered 
              w-full
              max-w-sm
          "/>
          <button
            onClick={clearAvatarUpload}
            className='
              absolute
              top-[58%]
              right-[4%]
              sm:right-[36%]
            '
          >
            <FontAwesomeIcon 
              icon={faX} 
              className='
                transition-all
                hover:text-primary-focus
              '
            />
          </button>
          <InputError message={errors.avatar} className="mt-2" />
        </div>
        { /* Image Display */}
        { (data?.avatar || user?.avatar) && (
          <div className='h-64 w-64 avatar'>
            <div className='rounded-full'>
              <img
                src={data?.avatar ? (
                  URL.createObjectURL(data?.avatar)
                ) : (
                  getImageFromDisk(user?.avatar)
                )}
              />
            </div>
          </div>
        )}

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
