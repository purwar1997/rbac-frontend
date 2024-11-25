import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const useShowPermissions = openModal => {
  const location = useLocation();
  console.log(location);
  const showPermissionsRef = useRef(false);

  useEffect(() => {
    if (location.state?.isLoggedIn && !showPermissionsRef.current) {
      showPermissionsRef.current = true;
      location.state = null;
      openModal();
    }
  }, [openModal]);
};
