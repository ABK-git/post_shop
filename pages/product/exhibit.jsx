import React from "react";
import Exhibit from "../../components/exhibit/exhibit.pages";
import withApollo from "../../hoc/withApollo";
import WithAuthenticated from "../../hoc/withAuthenticated";

const ExhibitPage = () => <Exhibit />;

export default withApollo(WithAuthenticated(ExhibitPage));
