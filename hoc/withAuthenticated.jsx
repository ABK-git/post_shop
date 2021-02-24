import { getAuthUser } from "../apollo/actions";
import Redirect from "../components/redirect";
import React, { useEffect } from "react";
import Spinner from "../components/spinner/spinner.component";

const WithAuthenticated = (WrappedComponent) => (props) => {
  const {
    data: { user } = {},
    loading,
    error,
  } = getAuthUser();

  if (loading) {
    return <Spinner/>
  }

  return user ? <WrappedComponent {...props} /> : <Redirect to="/" />;
};

export default WithAuthenticated;
