import { getAuthUser } from "../apollo/actions";
import Redirect from "../components/redirect";
import React, { useEffect } from "react";

const WithUnAuthenticated = (WrappedComponent) => (props) => {
  const {
    data: { user } = {},
    loading,
    error,
  } = getAuthUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Redirect to="/" /> : <WrappedComponent {...props} />;
};

export default WithUnAuthenticated;
