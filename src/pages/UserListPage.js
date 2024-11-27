import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useShowPermissions } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import { fetchUsersAsync } from '../app/slices/userSlice';
import { selectLoggedInUser } from '../app/slices/authSlice';
import { isUserAllowed } from '../utils/helperFunctions';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import UserTableItem from '../components/UserTableItem';
import PermissionDisplayModal from '../components/PermissionDisplayModal';
import AccessDeniedModal from '../components/AccessDeniedModal';
import { PERMISSIONS } from '../constants';

const UserListPage = () => {
  const [openPermissionModal, setOpenPermissionModal] = useState(false);
  const [openAccessDeniedModal, setOpenAccessDeniedModal] = useState(false);

  const status = useSelector(state => state.user.status);
  const users = useSelector(state => state.user.users);
  const error = useSelector(state => state.user.error);
  const loggedInUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usersToDisplay = useMemo(
    () =>
      users
        .filter(user => user.id !== loggedInUser.id)
        .filter(user => !user.isArchived)
        .toReversed(),
    [users]
  );

  const togglePermissionModal = () => setOpenPermissionModal(!openPermissionModal);
  const toggleAccessDeniedModal = () => setOpenAccessDeniedModal(!openAccessDeniedModal);

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  useShowPermissions(togglePermissionModal);

  const handleClick = () => {
    if (isUserAllowed(loggedInUser, PERMISSIONS.ADD_USER)) {
      navigate('/users/add');
    } else {
      toggleAccessDeniedModal();
    }
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (error) {
    console.log(error.data.message);
  }

  return (
    <main className='outlet-height px-20 py-10 flex flex-col'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl text-center'>All Users</h1>

        <button
          className='font-medium text-indigo-500 hover:text-indigo-600 flex items-center gap-2'
          onClick={handleClick}
        >
          <FaPlus />
          <span>Add user</span>
        </button>
      </div>

      <section className='mt-10 flex-1'>
        <table className='w-full text-left bg-white'>
          <thead className='border-b border-gray-300'>
            <tr className='*:font-medium *:text-gray-700 *:px-5 *:py-4'>
              <th>ID</th>
              <th>Username</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-300 text-sm'>
            {usersToDisplay.map(user => (
              <UserTableItem key={user.id} user={user} loggedInUser={loggedInUser} />
            ))}
          </tbody>
        </table>
      </section>

      {openPermissionModal && <PermissionDisplayModal closeModal={togglePermissionModal} />}

      {openAccessDeniedModal && (
        <AccessDeniedModal closeModal={toggleAccessDeniedModal} actionType={PERMISSIONS.ADD_USER} />
      )}
    </main>
  );
};

export default UserListPage;
