import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import AuthContext from './AuthContext';

const ProtectedRoute = ({ children, accessBy }) => {
  const { user } = useContext(AuthContext);
  if (accessBy == 'non-authenticated') {
    if (!user) {
      return children;
    }
  } else if (accessBy === 'authenticated') {
    if (user) {
      return children;
    }
  }

  return <Navigate to="/"></Navigate>;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  accessBy: PropTypes.oneOf(['non-authenticated', 'authenticated']).isRequired,
};

export default ProtectedRoute;
