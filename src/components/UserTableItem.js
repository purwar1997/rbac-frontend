import { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  activateUserAsync,
  deactivateUserAsync,
  archiveUserAsync,
  restoreUserAsync,
} from '../app/slices/userSlice';
import { isUserAllowed } from '../utils/helperFunctions';
import { classNames } from '../utils/helperFunctions';
import DeleteUserModal from './DeleteUserModal';
import AccessDeniedModal from './AccessDeniedModal';
import { PERMISSIONS } from '../constants';

const { EDIT_USER, DELETE_USER, ACTIVATE_USER, DEACTIVATE_USER, ARCHIVE_USER, RESTORE_USER } =
  PERMISSIONS;

const UserTableItem = memo(({ user, loggedInUser }) => {
  const { id, name, role, isActive, isArchived } = user;

  const [userAction, setUserAction] = useState('');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAccessDeniedModal, setOpenAccessDeniedModal] = useState(false);
  const [activationStatus, setActivationStatus] = useState('idle');
  const [archivalStatus, setArchivalStatus] = useState('idle');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);
  const toggleAccessDeniedModal = () => setOpenAccessDeniedModal(!openAccessDeniedModal);

  const handleActions = async action => {
    if (!isUserAllowed(loggedInUser, action)) {
      setUserAction(action);
      toggleAccessDeniedModal();
      return;
    }

    switch (action) {
      case EDIT_USER:
        navigate(`/users/${id}/edit`);
        break;

      case DELETE_USER:
        toggleDeleteModal();
        break;

      case ACTIVATE_USER:
      case DEACTIVATE_USER:
        try {
          setActivationStatus('pending');
          await dispatch(isActive ? deactivateUserAsync(id) : activateUserAsync(id)).unwrap();
        } catch (error) {
          console.log(error);
        } finally {
          setActivationStatus('idle');
        }

        break;

      case ARCHIVE_USER:
      case RESTORE_USER:
        try {
          setArchivalStatus('pending');
          await dispatch(isArchived ? restoreUserAsync(id) : archiveUserAsync(id)).unwrap();
        } catch (error) {
          console.log(error);
        } finally {
          setArchivalStatus('idle');
        }

        break;

      default:
        throw new Error('Provided invalid action type');
    }
  };

  return (
    <tr className='*:px-5 *:py-4 hover:bg-slate-100'>
      <td>{id}</td>
      <td>{name}</td>
      <td>{role.title}</td>
      <td>{isActive ? 'Active' : 'Inactive'}</td>
      <td className='flex gap-6'>
        <button
          className='text-indigo-500 font-medium focus-visible:outline-0 hover:text-indigo-600'
          onClick={() => handleActions(EDIT_USER)}
        >
          Edit
        </button>

        <button
          className='text-indigo-500 font-medium focus-visible:outline-0 hover:text-indigo-600'
          onClick={() => handleActions(DELETE_USER)}
        >
          Delete
        </button>

        <button
          className={classNames(
            'text-indigo-500 font-medium focus-visible:outline-0 hover:text-indigo-600',
            archivalStatus === 'pending' ? 'cursor-wait' : ''
          )}
          onClick={() => handleActions(isArchived ? RESTORE_USER : ARCHIVE_USER)}
          disabled={archivalStatus === 'pending'}
        >
          {isArchived ? 'Restore' : 'Archive'}
        </button>

        <button
          className={classNames(
            'text-indigo-500 font-medium focus-visible:outline-0 hover:text-indigo-600',
            activationStatus === 'pending' ? 'cursor-wait' : ''
          )}
          onClick={() => handleActions(isActive ? DEACTIVATE_USER : ACTIVATE_USER)}
          disabled={activationStatus === 'pending'}
        >
          {isActive ? 'Deactivate' : 'Activate'}
        </button>

        {openAccessDeniedModal && (
          <AccessDeniedModal closeModal={toggleAccessDeniedModal} actionType={userAction} />
        )}

        {openDeleteModal && <DeleteUserModal closeModal={toggleDeleteModal} userId={id} />}
      </td>
    </tr>
  );
});

export default UserTableItem;
