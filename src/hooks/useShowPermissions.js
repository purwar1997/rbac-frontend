import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useShowPermissions = openModal => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.isLoggedIn) {
      navigate('.', { state: null });
      openModal();
    }
  }, [openModal, navigate, location]);
};
