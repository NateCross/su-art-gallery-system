import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { FormTextInput } from '@/Components/FormTextInput';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();

    post(route('register'));
  };

  return <>
    <Head title="Register" />
    <div className='
      grid
      place-items-center
      mx-5
      sm:h-[70vh]
      grid-cols-1
    '>
      <div className='
        card
        bg-base-300
        rounded-box
        w-full
        max-w-xl
        mx-5
      '>
        {status &&
          <div className="
            mb-4 font-medium text-sm text-green-600
          ">
            {status}
          </div>}
        <form
          onSubmit={submit}
          className='
            form-control
            gap-2
            mx-5
          '
        >
          <div className='
              grid
              place-items-center
          '>
            <div className='
              max-w-md
              w-full
              flex
              flex-col
              my-4
              gap-4
            '>
              <FormTextInput
                value={data.name}
                id='name'
                name='name'
                title='Name'
                label='Name'
                onChange={e => setData('name', e.target.value)}
                error={errors.name}
                autoComplete='name'
              />
              <FormTextInput
                value={data.email}
                id='email'
                name='email'
                title='Email Address'
                label='Email Address'
                onChange={e => setData('email', e.target.value)}
                error={errors.email}
                autoComplete='username'
              />
              <FormTextInput
                value={data.password}
                id='password'
                name='password'
                title='Password'
                label='Password'
                type='password'
                onChange={e => setData('password', e.target.value)}
                error={errors.password}
                autoComplete='current-password'
              />
              <FormTextInput
                value={data.password_confirmation}
                id='password_confirmation'
                name='password_confirmation'
                title='Confirm Password'
                label='Confirm Password'
                type='password'
                onChange={e => setData('password_confirmation', e.target.value)}
                error={errors.password_confirmation}
              />
            </div>
          </div>

          <div className="
            flex 
            items-end
            justify-end 
            max-w-lg
            gap-3
            m-5
            mt-3
          ">
            <div className='
              flex
              flex-col
              gap-3
            '>
              <Link
                href={route('login')}
                className="
                  btn
                  btn-sm
                "
              >
                Already registered?
              </Link>
            </div>

            <button
              type='submit'
              className='
                btn
                btn-primary
                btn-rounded
                btn-lg
              '
            >
              Register
            </button>

          </div>
        </form>
      </div>

    </div>
  </>
}