import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectLoggedInUser } from '../app/slices/authSlice';
import { routeActions } from '../utils/routeActions';
import { isUserAllowed } from '../utils/helperFunctions';

const Protected = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  const location = useLocation();

  if (!user) {
    return <Navigate to={`/login?redirectTo=${location.pathname}`} replace={true} />;
  }

  if (!isUserAllowed(user, routeActions[location.pathname])) {
    return <Navigate to='/' replace={true} />;
  }

  return children;
};

export default Protected;
