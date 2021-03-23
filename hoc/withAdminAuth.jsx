import { getAuthUser } from "../apollo/actions";
import Redirect from "../components/redirect";
import React from "react";
import Spinner from "../components/spinner/spinner.component";

const WithAdminAuth = (WrappedComponent) => (props) => {
  const { data: { user } = {}, loading, error } = getAuthUser();

  if (loading) {
    return <Spinner />;
  }

  return user && user.role === "admin" ? (
    <WrappedComponent {...props} user={user} adminPage={true} />
  ) : (
    <Redirect to="/" />
  );
};

export default WithAdminAuth;
