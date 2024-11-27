import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useShowPermissions = openModal => {
  const location = useLocation();
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current && location.state?.isLoggedIn) {
      navigate(location.pathname, { replace: true, state: null });
      hasRun.current = true;
      openModal();
    }
  }, [location, openModal, navigate]);
};
