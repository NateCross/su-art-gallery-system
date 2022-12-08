import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { FormTextInput } from '@/Components/FormTextInput';

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: '',
  });

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('login'));
  };

  return <>
    <Head title="Log in" />
    <div className='
      grid
      place-items-center
      mx-5
      sm:h-[70vh]
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
            </div>
          </div>

          <div className="block max-w-lg mx-5">
            <label className="
              label 
              cursor-pointer 
              justify-end
              gap-5
            ">
              <span className="label-text">Remember Me</span>
              <input
                value={data.remember}
                type="checkbox"
                name="remember"
                id="remember"
                onChange={e => setData('remember', e.target.checked)}
                className='
                  checkbox
                  checkbox-primary
                '
              />
            </label>
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
                href={route('register')}
                className="
                  btn
                  btn-xs
                "
              >
                Need an account?
              </Link>
              {canResetPassword && (
                <Link
                  href={route('password.request')}
                  className="
                    btn
                    btn-xs
                  "
                >
                  Forgot your password?
                </Link>
              )}

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
              Log In
            </button>

          </div>
        </form>
      </div>

    </div>
  </>
}
