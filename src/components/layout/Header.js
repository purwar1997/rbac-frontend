import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { selectLoggedInUser, logoutAsync } from '../../app/slices/authSlice';
import { classNames } from '../../utils/helperFunctions';

const navigationLinks = [
  { name: 'Users', href: '/' },
  { name: 'Roles', href: '/roles' },
];

const Header = () => {
  const [status, setStatus] = useState('idle');
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setStatus('pending');
      await dispatch(logoutAsync()).unwrap();
      localStorage.removeItem('loggedInUserId');
      navigate('/login');
    } catch (error) {
      console.log(error.data.message);
    } finally {
      setStatus('idle');
    }
  };

  return (
    <header className='bg-gray-700 h-20 px-12 flex justify-between items-center gap-12 sticky top-0 z-10'>
      <Link to='.'>
        <h1 className='text-3xl text-white'>RBAC UI</h1>
      </Link>

      <nav className='flex-1 space-x-5 relative top-1 flex justify-end'>
        {navigationLinks.map(link => (
          <NavLink
            className={({ isActive }) =>
              classNames(
                'px-3 py-1.5 rounded-md text-white hover:bg-gray-800',
                isActive ? 'bg-gray-900 hover:bg-gray-900' : ''
              )
            }
            key={link.name}
            to={link.href}
            end={true}
          >
            {link.name}
          </NavLink>
        ))}

        {user && (
          <button
            className={classNames(
              'px-3 py-1.5 text-white rounded-md hover:bg-gray-800',
              status === 'pending' ? 'cursor-wait' : ''
            )}
            onClick={handleLogout}
            disabled={status === 'pending'}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
