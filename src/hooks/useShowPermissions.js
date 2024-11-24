import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useShowPermissions = openModal => {
  const location = useLocation();

  useEffect(() => {
    if (location.state.isLoggedIn) {
      openModal();
    }
  }, [openModal]);
};
