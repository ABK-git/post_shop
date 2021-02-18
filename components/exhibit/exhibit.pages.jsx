import React from 'react';
import withApollo from '../../hoc/withApollo';
import WithAuthenticated from '../../hoc/withAuthenticated';

const Exhibit = () => {
  return  <div>Exhibit</div>
}

export default withApollo(WithAuthenticated(Exhibit));