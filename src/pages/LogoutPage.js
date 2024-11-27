import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAsync } from '../app/slices/authSlice';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const LogoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutAsync()).unwrap();
      localStorage.removeItem('loggedInUserId');
      navigate('/login', { replace: true });
    } catch (error) {
      console.log(error.data.message);
    }
  };

  const stableHandleLogout = useCallback(handleLogout, [dispatch, navigate]);

  useEffect(() => {
    stableHandleLogout();
  }, [stableHandleLogout]);

  return <LoadingSpinner />;
};

export default LogoutPage;
