import { useSelector } from 'react-redux';
import { useHandleModal } from '../hooks';
import { FaCheck } from 'react-icons/fa6';
import { RxCross2 } from 'react-icons/rx';
import { MdError } from 'react-icons/md';
import { selectLoggedInUser } from '../app/slices/authSlice';
import { handleClickOutside } from '../utils/helperFunctions';
import { PERMISSIONS, PERMISSIONS_DESCRIPTION } from '../constants';

const AccessDeniedModal = ({ closeModal, actionType }) => {
  const user = useSelector(selectLoggedInUser);
  useHandleModal(closeModal);

  return (
    <div
      className='w-screen h-screen fixed top-0 left-0 bg-black/40 flex justify-center items-center z-30'
      onClick={e => handleClickOutside(e, closeModal)}
    >
      <section className='w-96 bg-white rounded-lg'>
        <header className='bg-gray-100 px-6 py-4 rounded-t-lg border-b border-gray-300 flex justify-between items-center'>
          <h2 className='text-lg'>Permission Denied</h2>

          <button className='text-2xl' onClick={closeModal}>
            <RxCross2 />
          </button>
        </header>

        <div className='px-6 py-4'>
          <div className='space-y-2'>
            <div className='flex items-start gap-2.5 *:text-red-500'>
              <span className='relative text-xl top-px'>
                <MdError />
              </span>

              <p className='text-base'>
                The role you have been assigned is that of a {user.role.title.toLowerCase()}.
                Therefore, you don't have the required permissions to{' '}
                {PERMISSIONS_DESCRIPTION[actionType].toLowerCase()}.
              </p>
            </div>

            <p>Your permissions as a {user.role.title.toLowerCase()} are as follows:</p>

            <ul className='list-none'>
              {Object.values(PERMISSIONS).map(actionType => (
                <li className='flex items-center gap-1' key={actionType}>
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

          <div className='mt-5 pt-5 border-t border-gray-200 flex justify-end'>
            <button
              className='w-20 py-1 border border-gray-300 bg-white rounded-md text-sm hover:bg-gray-100'
              onClick={closeModal}
            >
              Ok
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccessDeniedModal;
