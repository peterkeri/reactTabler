import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Grid, Card } from 'tabler-react'
import { Redirect } from 'react-router-dom'
import { resetPassword } from '../../../api/queries'
import { ServerResponseContext } from '../../../context/ServerResponseProvider'
import ResetPasswordForm from '../../../components/Forms/ResetPasswordForm'

class ResetPassword extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      password: '',
      passwordConfirmation: '',
      redirectToReferrer: false
    };
    [, this.dispatch] = context
  }

    onChangeHandler = (e) => {
      const { name: target, value } = e.target
      const [{ formErrors }] = this.context

      this.setState({ [target]: value })

      if (Object.keys(formErrors).length > 0) {
        this.dispatch({
          type: 'updateFormErrors',
          updatedFormErrors: {}
        })
      }
    };

    handleSubmit = (e) => {
      e.preventDefault()

      const { location: { state: { userData: { email, token } } } } = this.props
      const { password, passwordConfirmation } = this.state

      const data = {
        email,
        password,
        password_confirmation: passwordConfirmation,
        token
      }
      resetPassword(data, this.dispatch).then((res) => {
        if ('success' in res) {
          this.setState({ redirectToReferrer: true })
        }
      })
    };

    render() {
      const [{ formErrors }] = this.context
      const { location: { state: { userData: { email } } } } = this.props
      const { redirectToReferrer, password, passwordConfirmation } = this.state

      if (redirectToReferrer) {
        return <Redirect to="/user/login" />
      }

      return (
        <Container className="h-100">
          <Grid.Row className="h-100" alignItems="center" justifyContent="center">
            <Grid.Col md={6}>
              <Card>
                <Card.Header>
                  <Card.Title>Change password</Card.Title>
                </Card.Header>
                <Card.Body>
                  <ResetPasswordForm
                    email={email}
                    password={password}
                    passwordConfirmation={passwordConfirmation}
                    formErrors={formErrors}
                    handleSubmit={this.handleSubmit}
                    onChangeHandler={this.onChangeHandler}
                  />
                </Card.Body>
              </Card>
            </Grid.Col>
          </Grid.Row>
        </Container>
      )
    }
}

ResetPassword.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      userData: PropTypes.shape({
        email: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired
      })
    })
  }).isRequired,
}

export default ResetPassword
ResetPassword.contextType = ServerResponseContext
