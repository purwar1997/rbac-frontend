import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useShowPermissions } from '../hooks';
import { editRoleAsync, fetchRoleByIdAsync } from '../app/slices/roleSlice';
import { classNames } from '../utils/helperFunctions';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ButtonLoader from '../components/ui/ButtonLoader';
import PermissionDisplayModal from '../components/PermissionDisplayModal';
import { PERMISSIONS, PERMISSIONS_DESCRIPTION } from '../constants';

const EditRolePage = () => {
  const [roleTitle, setRoleTitle] = useState('');
  const [rolePermissions, setRolePermissions] = useState([]);
  const [openPermissionModal, setOpenPermissionModal] = useState(false);
  const [editStatus, setEditStatus] = useState('idle');

  const { id } = useParams();
  const navigate = useNavigate();

  const status = useSelector(state => state.role.selectedRoleStatus);
  const role = useSelector(state => state.role.selectedRole);
  const error = useSelector(state => state.role.selectedRoleError);
  const dispatch = useDispatch();

  const togglePermissionModal = () => setOpenPermissionModal(!openPermissionModal);

  useEffect(() => {
    dispatch(fetchRoleByIdAsync(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (role) {
      setRoleTitle(role.title);
      setRolePermissions(role.permissions);
    }
  }, [role]);

  useShowPermissions(togglePermissionModal);

  const updateTitle = e => setRoleTitle(e.target.value);

  const updatePermissions = e => {
    if (e.target.checked) {
      setRolePermissions(rolePermissions.concat(e.target.value));
    } else {
      setRolePermissions(rolePermissions.filter(value => value !== e.target.value));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setEditStatus('pending');
      await dispatch(
        editRoleAsync({ roleId: id, updates: { title: roleTitle, permissions: rolePermissions } })
      ).unwrap();
      navigate('/roles');
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
    console.log(error.data.message);
  }

  return (
    <main className='page-height px-20 py-10 flex flex-col items-center gap-10'>
      <h1 className='text-3xl'>Edit role</h1>

      <form className='max-w-2xl w-full space-y-5' onSubmit={handleSubmit}>
        <div className='flex-1 flex flex-col gap-2'>
          <label className='font-medium text-gray-500' htmlFor='title'>
            Title
          </label>

          <input
            className='w-full px-3 py-2 ring-1 ring-gray-300 shadow rounded-md focus:ring-2 focus:ring-indigo-500'
            type='text'
            name='title'
            id='title'
            value={roleTitle}
            onChange={updateTitle}
            required
          />
        </div>

        <div>
          <p className='font-medium text-gray-500'>Select permissions for the role:</p>

          <div className='mt-2 space-y-1'>
            {Object.values(PERMISSIONS).map(permission => (
              <div className='flex gap-2.5' key={permission}>
                <input
                  type='checkbox'
                  name='permissions'
                  id={permission}
                  value={permission}
                  onChange={updatePermissions}
                  checked={rolePermissions.includes(permission)}
                />
                <label htmlFor={permission}>{PERMISSIONS_DESCRIPTION[permission]}</label>
              </div>
            ))}
          </div>
        </div>

        <button
          className={classNames(
            'w-full h-11 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 flex justify-center items-center',
            editStatus === 'pending' ? 'cursor-wait' : ''
          )}
          type='submit'
          disabled={editStatus === 'pending'}
        >
          {editStatus === 'pending' ? <ButtonLoader /> : 'Edit Role'}
        </button>
      </form>

      {openPermissionModal && <PermissionDisplayModal closeModal={openPermissionModal} />}
    </main>
  );
};

export default EditRolePage;
