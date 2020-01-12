import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { Container, Grid, Card } from 'tabler-react'
import {
  userLogin,
  userRolesByToken,
  userPermissionsByToken
} from '../../../api/queries'
import LoginForm from '../../../components/Forms/LoginForm'
import AuthWrapper from '../../../components/AuthWrapper'
import { ServerResponseContext } from '../../../context/ServerResponseProvider'

class Login extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      identity: '',
      password: '',
      redirectToReferrer: false
    };
    [, this.authDispatch] = props.authContext;
    [, this.dispatch] = context
  }

  componentDidMount() {
    const {
      authContext: [{ token_type, access_token }]
    } = this.props

    if ((token_type && access_token) !== '') {
      this.setState({ redirectToReferrer: true })
    }
  }

  componentDidUpdate() {
    console.log(this.props)
  }

  /**
   *
   */
  onChangeHandler = (e) => {
    const { name: target, value } = e.target
    const [{ formErrors }] = this.context

    this.setState({
      [target]: value
    })

    if (Object.keys(formErrors).length > 0) {
      this.dispatch({
        type: 'updateFormErrors',
        updateFormErrors: {}
      })
    }
  };

  /**
   *
   */
  handleSubmit = (event) => {
    event.preventDefault()

    const { identity, password } = this.state

    const formValues = {
      identity,
      password
    }

    const login = this.login(formValues)
    const {
      authContext: [{ token_type, access_token }]
    } = this.props

    login
      .then(async () => {
        const roles = await this.roles()
        const perms = await this.perms()
        return { roles, perms }
      })
      .then((data) => {
        this.authDispatch({
          type: 'setRoles',
          updateRoles: data.roles.data
        })
        this.authDispatch({
          type: 'setPerms',
          updateRoles: data.perms.data
        })
        this.setState({
          redirectToReferrer: true
        })
      })
      .catch((e) => {
        console.log(e)
      })
  };

  /**
   *
   */
  login = (data) =>
    userLogin(data, this.dispatch)
      .then((json) => {
        if ('success' in json) {
          const { access_token, token_type, expires_at } = json.data

          this.authDispatch({
            type: 'setToken',
            updateToken: {
              access_token,
              token_type,
              expires_at
            }
          })
        }
        return json.data
      })
      .catch((error) => error);

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
    const {
      location: { state }
    } = this.props
    const { from } = state || { from: { pathname: '/customer/' } }
    const { redirectToReferrer, identity, password } = this.state
    const [{ formErrors }] = this.context

    if (redirectToReferrer) {
      return <Redirect to={from.pathname} />
    }

    return (
      <Container className="h-100">
        <Grid.Row className="h-100" alignItems="center" justifyContent="center">
          <Grid.Col md={6}>
            <Card>
              <Card.Header>
                <Card.Title>Sign in</Card.Title>
              </Card.Header>
              <Card.Body>
                <LoginForm
                  identity={identity}
                  password={password}
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

export default AuthWrapper(Login)

Login.propTypes = {
  location: PropTypes.shape().isRequired,
  authContext: PropTypes.shape().isRequired
}

Login.contextType = ServerResponseContext
