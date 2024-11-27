import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useShowPermissions } from '../hooks';
import { addNewRoleAsync } from '../app/slices/roleSlice';
import { classNames } from '../utils/helperFunctions';
import ButtonLoader from '../components/ui/ButtonLoader';
import PermissionDisplayModal from '../components/PermissionDisplayModal';
import { PERMISSIONS, PERMISSIONS_DESCRIPTION } from '../constants';

const AddRolePage = () => {
  const [roleTitle, setRoleTitle] = useState('');
  const [rolePermissions, setRolePermissions] = useState([]);
  const [openPermissionModal, setOpenPermissionModal] = useState(false);
  const [addStatus, setAddStatus] = useState('idle');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePermissionModal = () => setOpenPermissionModal(!openPermissionModal);
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
      setAddStatus('pending');
      await dispatch(addNewRoleAsync({ title: roleTitle, permissions: rolePermissions })).unwrap();
      navigate('/roles');
    } catch (error) {
      console.log(error);
    } finally {
      setAddStatus('idle');
    }
  };

  return (
    <main className='page-height px-20 py-10 flex flex-col items-center gap-10'>
      <h1 className='text-3xl'>Add new role</h1>

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
                />
                <label htmlFor={permission}>{PERMISSIONS_DESCRIPTION[permission]}</label>
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
          {addStatus === 'pending' ? <ButtonLoader /> : 'Add Role'}
        </button>
      </form>

      {openPermissionModal && <PermissionDisplayModal closeModal={openPermissionModal} />}
    </main>
  );
};

export default AddRolePage;
