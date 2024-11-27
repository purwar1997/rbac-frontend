import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useShowPermissions } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import { fetchRolesAsync, selectRoles } from '../app/slices/roleSlice';
import { selectLoggedInUser } from '../app/slices/authSlice';
import { isUserAllowed } from '../utils/helperFunctions';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import RoleTableItem from '../components/RoleTableItem';
import PermissionDisplayModal from '../components/PermissionDisplayModal';
import AccessDeniedModal from '../components/AccessDeniedModal';
import { PERMISSIONS } from '../constants';

const RoleListPage = () => {
  const [openPermissionModal, setOpenPermissionModal] = useState(false);
  const [openAccessDeniedModal, setOpenAccessDeniedModal] = useState(false);

  const roles = useSelector(selectRoles);
  const status = useSelector(state => state.role.status);
  const error = useSelector(state => state.role.error);
  const loggedInUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePermissionModal = () => setOpenPermissionModal(!openPermissionModal);
  const toggleAccessDeniedModal = () => setOpenAccessDeniedModal(!openAccessDeniedModal);

  useEffect(() => {
    dispatch(fetchRolesAsync());
  }, [dispatch]);

  useShowPermissions(togglePermissionModal);

  const handleClick = () => {
    if (isUserAllowed(loggedInUser, PERMISSIONS.ADD_ROLE)) {
      navigate('/roles/add');
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
        <h1 className='text-3xl text-center'>All Roles</h1>

        <button
          className='font-medium text-indigo-500 hover:text-indigo-600 flex items-center gap-2'
          onClick={handleClick}
        >
          <FaPlus />
          <span>Add role</span>
        </button>
      </div>

      <section className='mt-10 flex-1'>
        <table className='w-full text-left bg-white'>
          <thead className='border-b border-gray-200'>
            <tr className='*:font-medium *:text-gray-700 *:px-5 *:py-4'>
              <th>ID</th>
              <th>Title</th>
              <th>No. of users</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-200 text-sm'>
            {roles.toReversed().map(role => (
              <RoleTableItem key={role.id} role={role} loggedInUser={loggedInUser} />
            ))}
          </tbody>
        </table>
      </section>

      {openPermissionModal && <PermissionDisplayModal closeModal={togglePermissionModal} />}

      {openAccessDeniedModal && (
        <AccessDeniedModal closeModal={toggleAccessDeniedModal} actionType={PERMISSIONS.ADD_ROLE} />
      )}
    </main>
  );
};

export default RoleListPage;
