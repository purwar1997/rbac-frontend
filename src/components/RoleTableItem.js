import { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { isUserAllowed } from '../utils/helperFunctions';
import AccessDeniedModal from './AccessDeniedModal';
import { PERMISSIONS } from '../constants';

const RoleTableItem = memo(({ role, loggedInUser }) => {
  const { id, title, userCount } = role;

  const [openAccessDeniedModal, setOpenAccessDeniedModal] = useState(false);
  const navigate = useNavigate();

  const toggleAccessDeniedModal = () => setOpenAccessDeniedModal(!openAccessDeniedModal);

  const handleClick = () => {
    if (isUserAllowed(loggedInUser, PERMISSIONS.EDIT_ROLE)) {
      navigate(`/roles/${id}/edit`);
    } else {
      toggleAccessDeniedModal();
    }
  };

  return (
    <tr className='*:px-5 *:py-4 hover:bg-slate-100'>
      <td>{id}</td>
      <td>{title}</td>
      <td>{userCount}</td>
      <td className='flex gap-5'>
        <button
          className='text-indigo-500 font-medium focus-visible:outline-0'
          onClick={handleClick}
        >
          Edit
        </button>

        {openAccessDeniedModal && (
          <AccessDeniedModal
            closeModal={toggleAccessDeniedModal}
            actionType={PERMISSIONS.EDIT_ROLE}
          />
        )}
      </td>
    </tr>
  );
});

export default RoleTableItem;
