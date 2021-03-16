import React from "react";
import UpdateInfo from "../../components/update-info/update-info.page";
import withApollo from "../../hoc/withApollo";
import WithAuthenticated from "../../hoc/withAuthenticated";

const UpdateInfoPage = ({ user }) => <UpdateInfo user={user} />;

export default withApollo(WithAuthenticated(UpdateInfoPage));
