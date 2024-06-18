

import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ element: Component, ...rest }) => {
  const hasToken = !!localStorage.getItem("token"); // Check if token exists in local storage

  return hasToken ? <Component {...rest} /> : <Navigate to="/login" replace />;
};

export const PublicRoute = ({ element: Component, ...rest }) => {
  const hasToken = !!localStorage.getItem("token"); // Check if token exists in local storage

  return hasToken ? (
    // <Navigate to="/employee" replace />
    null
  ) : (
    <Component {...rest} />
  );
};

PublicRoute.propTypes = {
  element: PropTypes.elementType.isRequired
};

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired
};
