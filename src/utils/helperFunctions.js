export const classNames = (...classes) => classes.filter(Boolean).join(' ');

export const delay = milliSeconds => {
  return new Promise(resolve => {
    setTimeout(resolve, milliSeconds);
  });
};

export const isUserAllowed = (user, action) => user.role.permissions.includes(action);

export const handleClickOutside = (event, closeModal) => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
};
