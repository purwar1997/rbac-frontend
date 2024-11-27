import { useSelector } from 'react-redux';
import { useHandleModal } from '../hooks';
import { FaCheck } from 'react-icons/fa6';
import { RxCross2 } from 'react-icons/rx';
import { selectLoggedInUser } from '../app/slices/authSlice';
import { handleClickOutside } from '../utils/helperFunctions';
import { PERMISSIONS, PERMISSIONS_DESCRIPTION } from '../constants';

const PermissionDisplayModal = ({ closeModal }) => {
  const user = useSelector(selectLoggedInUser);
  useHandleModal(closeModal);

  return (
    <div
      className='w-screen h-screen fixed top-0 left-0 bg-black/40 flex justify-center items-center z-30'
      onClick={e => handleClickOutside(e, closeModal)}
    >
      <section className='w-[400px] bg-white rounded-lg'>
        <header className='bg-gray-100 px-6 py-4 rounded-t-lg border-b border-gray-300 flex justify-between items-center'>
          <h2 className='text-lg'>Your Permissions</h2>

          <button className='text-2xl' onClick={closeModal}>
            <RxCross2 />
          </button>
        </header>

        <div className='px-6 py-4'>
          <div className='space-y-3'>
            <p className='text-green-700'>
              Welcome {user.name.split(' ')[0]}, you are successfully logged in as a{' '}
              {user.role.title.toLowerCase()}.
            </p>

            <p className='text-sm'>
              Your permissions as a {user.role.title.toLowerCase()} are as follows:
            </p>

            <ul className='list-none space-y-1'>
              {Object.values(PERMISSIONS).map(actionType => (
                <li className='flex items-center gap-2.5 text-sm' key={actionType}>
                  {user.role.permissions.includes(actionType) ? (
                    <FaCheck className='text-green-600' />
                  ) : (
                    <RxCross2 className='text-red-600' />
                  )}
                  <span>{PERMISSIONS_DESCRIPTION[actionType]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PermissionDisplayModal;
