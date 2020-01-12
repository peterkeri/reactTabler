import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { findByToken } from '../../../api/queries'
import { ServerResponseContext } from '../../../context/ServerResponseProvider'

class ResetPasswordCheckToken extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      userData: {},
      redirectToReferrer: false
    };
    [, this.dispatch] = context
  }

  componentDidMount() {
    const { match: { params } } = this.props
    this.checkToken(params.token)
  }


    checkToken = (token) => findByToken(token, this.dispatch)
      .then((json) => {
        if ('success' in json) {
          this.setState({
            userData: json.data,
            redirectToReferrer: true,
          })
        }

        return json.data
      })
      .catch((error) => error)

    render() {
      const { location } = this.props
      const { from } = location.state || { from: { pathname: '/user/password/reset' } }
      const { userData, redirectToReferrer } = this.state


      if (redirectToReferrer) {
        return <Redirect to={{ ...from, state: { userData } }} />
      }

      return (<div />)
    }
}

export default ResetPasswordCheckToken

ResetPasswordCheckToken.propTypes = {
  location: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired
}

ResetPasswordCheckToken.contextType = ServerResponseContext
