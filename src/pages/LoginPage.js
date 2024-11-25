import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { loginAsync } from '../app/slices/authSlice';
import { classNames } from '../utils/helperFunctions';
import ButtonLoader from '../components/ui/ButtonLoader';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState('idle');
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const redirectToPath = searchParams.get('redirectTo');

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setStatus('pending');
      const user = await dispatch(loginAsync(username)).unwrap();
      localStorage.setItem('loggedInUserId', user.id);
      navigate(redirectToPath ?? '/', {
        replace: true,
        state: { isLoggedIn: true },
      });
    } catch (error) {
      console.log(error.data.message);
    } finally {
      setStatus('idle');
    }
  };

  return (
    <main className='max-w-screen min-h-screen p-12 flex flex-col justify-center items-center gap-10'>
      <header>
        <h1 className='text-3xl text-indigo-500 text-center font-bold'>
          Role-Based Access Control
        </h1>
      </header>

      <section className='max-w-md w-full flex flex-col items-center gap-8 p-7 border border-gray-300 rounded-lg'>
        <h2 className='text-2xl'>Sign in to your account</h2>

        <form className='w-full space-y-5' onSubmit={handleSubmit}>
          <div className='flex-1 flex flex-col gap-2'>
            <label className='font-medium text-gray-500' htmlFor='username'>
              Username
            </label>

            <input
              className='w-full px-3 py-2 ring-1 ring-gray-300 shadow rounded-md focus:ring-2 focus:ring-indigo-500'
              type='text'
              name='username'
              id='username'
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

          <button
            className={classNames(
              'w-full h-11 bg-indigo-600 rounded-md text-white font-medium hover:opacity-85 flex justify-center items-center',
              status === 'pending' ? 'cursor-wait' : ''
            )}
            type='submit'
            disabled={status === 'pending'}
          >
            {status === 'pending' ? <ButtonLoader /> : 'Sign In'}
          </button>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
