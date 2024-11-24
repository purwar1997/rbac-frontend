import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useShowPermissions } from '../hooks';
import { fetchRolesAsync, selectRoles } from '../app/slices/roleSlice';
import { fetchUserByIdAsync, editUserAsync } from '../app/slices/userSlice';
import { classNames } from '../utils/helperFunctions';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ButtonLoader from '../components/ui/ButtonLoader';
import PermissionDisplayModal from '../components/PermissionDisplayModal';

const EditUserPage = () => {
  const [userDetails, setUserDetails] = useState({ name: '', role: '' });
  const [editStatus, setEditStatus] = useState('idle');
  const [openPermissionModal, setOpenPermissionModal] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const status = useSelector(state => state.user.selectedUserStatus);
  const user = useSelector(state => state.user.selectedUser);
  const error = useSelector(state => state.user.selectedUserError);
  const roles = useSelector(selectRoles);
  const dispatch = useDispatch();

  const togglePermissionModal = () => setOpenPermissionModal(!openPermissionModal);

  useEffect(() => {
    dispatch(fetchUserByIdAsync(id));
    dispatch(fetchRolesAsync());
  }, [dispatch, id]);

  useEffect(() => {
    if (user) {
      setUserDetails({
        name: user.name,
        role: user.role.id,
      });
    }
  }, [user]);

  useShowPermissions(togglePermissionModal);

  const handleChange = e => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setEditStatus('pending');
      await dispatch(editUserAsync({ id, updates: userDetails })).unwrap();
      navigate('/');
    } catch (error) {
      console.log(error);
    } finally {
      setEditStatus('idle');
    }
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (error) {
    throw error;
  }

  return (
    <main className='page-height px-12 py-10 flex flex-col items-center gap-10'>
      <h1 className='text-3xl'>Edit user</h1>

      <form className='max-w-2xl w-full space-y-5' onSubmit={handleSubmit}>
        <div className='flex-1 flex flex-col gap-2'>
          <label className='font-medium text-gray-500' htmlFor='name'>
            Username
          </label>

          <input
            className='w-full px-3 py-2 rounded-md'
            type='text'
            name='name'
            id='name'
            value={userDetails.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <p>Choose the new role to be assigned:</p>

          <div>
            {roles.map(role => (
              <div className='flex gap-1' key={role.id}>
                <input
                  type='radio'
                  name='role'
                  id={role.title}
                  value={role.id}
                  onChange={handleChange}
                  defaultChecked={role.id === user.role.id}
                  required
                />
                <label htmlFor={role.title}>{role.title}</label>
              </div>
            ))}
          </div>
        </div>

        <button
          className={classNames(
            'w-full h-12 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 flex justify-center items-center',
            editStatus === 'pending' ? 'cursor-wait' : ''
          )}
          type='submit'
          disabled={editStatus === 'pending'}
        >
          {editStatus === 'pending' ? <ButtonLoader /> : 'Edit User'}
        </button>
      </form>

      {openPermissionModal && <PermissionDisplayModal closeModal={openPermissionModal} />}
    </main>
  );
};

export default EditUserPage;
