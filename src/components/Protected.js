import { useSelector } from 'react-redux';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { selectLoggedInUser } from '../app/slices/authSlice';
import { getRouteActions } from '../utils/routeActions';
import { isUserAllowed } from '../utils/helperFunctions';

const Protected = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  const location = useLocation();
  const { id } = useParams();

  const actionType = getRouteActions(id)[location.pathname];

  if (!user) {
    return <Navigate to={`/login?redirectTo=${location.pathname}`} replace={true} />;
  }

  if (!isUserAllowed(user, actionType)) {
    return (
      <Navigate
        to='/'
        replace={true}
        state={{
          isLoggedIn: location.state?.isLoggedIn,
        }}
      />
    );
  }

  return children;
};

export default Protected;
