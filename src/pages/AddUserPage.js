import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useShowPermissions } from '../hooks';
import { fetchRolesAsync, selectRoles } from '../app/slices/roleSlice';
import { addNewUserAsync } from '../app/slices/userSlice';
import { classNames } from '../utils/helperFunctions';
import ButtonLoader from '../components/ui/ButtonLoader';
import PermissionDisplayModal from '../components/PermissionDisplayModal';

const AddUserPage = () => {
  const [userDetails, setUserDetails] = useState({ name: '', role: '' });
  const [openPermissionModal, setOpenPermissionModal] = useState(false);
  const [addStatus, setAddStatus] = useState('idle');

  const roles = useSelector(selectRoles);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePermissionModal = () => setOpenPermissionModal(!openPermissionModal);

  useEffect(() => {
    dispatch(fetchRolesAsync());
  }, [dispatch]);

  useShowPermissions(togglePermissionModal);

  const handleChange = e => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setAddStatus('pending');
      await dispatch(addNewUserAsync(userDetails)).unwrap();
      navigate('/');
    } catch (error) {
      console.log(error);
    } finally {
      setAddStatus('idle');
    }
  };

  return (
    <main className='page-height px-20 py-10 flex flex-col items-center gap-10'>
      <h1 className='text-3xl'>Add new user</h1>

      <form className='max-w-2xl w-full space-y-5' onSubmit={handleSubmit}>
        <div className='flex-1 flex flex-col gap-2'>
          <label className='font-medium text-gray-600' htmlFor='name'>
            Username
          </label>

          <input
            className='w-full px-3 py-2 ring-1 ring-gray-400 shadow rounded-md focus:ring-2 focus:ring-indigo-500'
            type='text'
            name='name'
            id='name'
            value={userDetails.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <p className='font-medium text-gray-600'>Choose the role to be assigned:</p>

          <div className='mt-2 space-y-1'>
            {roles.map(role => (
              <div className='flex gap-2.5' key={role.id}>
                <input
                  type='radio'
                  name='role'
                  id={role.title}
                  value={role.id}
                  onChange={handleChange}
                  required
                />
                <label htmlFor={role.title}>{role.title}</label>
              </div>
            ))}
          </div>
        </div>

        <button
          className={classNames(
            'w-full h-11 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 flex justify-center items-center',
            addStatus === 'pending' ? 'cursor-wait' : ''
          )}
          type='submit'
          disabled={addStatus === 'pending'}
        >
          {addStatus === 'pending' ? <ButtonLoader /> : 'Add User'}
        </button>
      </form>

      {openPermissionModal && <PermissionDisplayModal closeModal={openPermissionModal} />}
    </main>
  );
};

export default AddUserPage;
