import React, { Component } from 'react'
import { userPermissionsByToken, userRolesByToken } from '../api/queries'
import { AuthenticationContext } from '../context/AuthenticationContextProvider'


// eslint-disable-next-line react/prefer-stateless-function
const AuthWrapper = (Content) => class extends Component {
  static contextType = AuthenticationContext;

  componentDidMount() {
    const [{
      access_token, token_type, expires_at, roles, permissions
    }, dispatch] = this.context
    console.log('fadfasdf')
    if ((access_token && token_type && expires_at) !== '' && roles.length === 0) {
      this.roles().then((data) => {
        dispatch({
          type: 'setRoles',
          updateRoles: data.roles.data,
        })
      }).catch((e) => console.log(e))
    }
  }


    /**
   *
   */
    roles = () =>
      userRolesByToken(this.dispatch)
        .then((json) => json)
        .catch((error) => error);

    /**
 *
 */
    perms = () =>
      userPermissionsByToken(this.dispatch)
        .then((json) => json)
        .catch((error) => error);

    render() {
      return <Content {...this.props} authContext={this.context} />
    }
}


export default AuthWrapper
