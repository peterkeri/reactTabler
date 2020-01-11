import React, { Component } from 'react';
import { AuthenticationContext } from '../context/AuthenticationContextProvider';


// eslint-disable-next-line react/prefer-stateless-function
const AuthWrapper = (Content) => class extends Component {
  render() {
    return (
      <AuthenticationContext.Consumer>
        {
        (context) => <Content {...this.props} authContext={context} />
        }
      </AuthenticationContext.Consumer>
    );
  }
};


export default AuthWrapper;

AuthWrapper.contextType = AuthenticationContext;
