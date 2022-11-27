import React, { useEffect, useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/inertia-react';
import { FormTextInput } from '@/Components/FormTextInput';

export default function DeleteUserForm({ className }) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef();

  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
  } = useForm({
    password: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('profile.destroy'));
  };

  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };

  const deleteUser = (e) => {
    e.preventDefault();
    destroy(route('profile.destroy'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      // onError: () => passwordInput.current.focus(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);
    reset();
  };

  return (
    <section className={`space-y-6 ${className}`}>
      <header>
        <h2 className="text-lg font-medium">Delete Account</h2>

        <p className="mt-1 text-sm">
          Once your account is deleted, all of its resources and data will be permanently deleted. Before
          deleting your account, please download any data or information that you wish to retain.
        </p>
      </header>

      {/* <DangerButton onClick={confirmUserDeletion}>Delete Account</DangerButton> */}
      <button
        className='
          btn
          btn-error
        '
        onClick={confirmUserDeletion}
      >
        Delete Account
      </button>

      <Modal show={confirmingUserDeletion} onClose={closeModal}>
        <form onSubmit={deleteUser} className="p-6 text-base-content">
          <h2 className="text-lg font-medium">
            Are you sure your want to delete your account?
          </h2>

          <p className="mt-1 text-sm">
            Once your account is deleted, all of its resources and data will be permanently deleted. Please
            enter your password to confirm you would like to permanently delete your account.
          </p>

          <div className="mt-6">
            <FormTextInput
              id='password'
              label='Password'
              value={data.password}
              onChange={e => setData('password', e.target.value)}
              type='password'
              name="password"
              error={errors.password}
            />
            {/* <InputLabel for="password" value="Password" className="sr-only" /> */}

            {/* <TextInput
              id="password"
              type="password"
              name="password"
              ref={passwordInput}
              value={data.password}
              handleChange={(e) => setData('password', e.target.value)}
              className="mt-1 block w-3/4"
              isFocused
              placeholder="Password"
            />

            <InputError message={errors.password} className="mt-2" /> */}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={closeModal}
              className='
                btn
              '
            >
              Cancel
            </button>
            <button
              type='submit'
              className='
                btn
                btn-error
                ml-3
              '
            >
              Delete Account
            </button>
            {/* <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton> */}

            {/* <DangerButton className="ml-3" processing={processing}>
              Delete Account
            </DangerButton> */}
          </div>
        </form>
      </Modal>
    </section>
  );
}
