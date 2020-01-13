import React, { Component } from 'react'

import { Redirect } from 'react-router-dom'
import { Container, Grid, Card } from 'tabler-react'
import {
  userLogin,
  userRolesByToken,
  userPermissionsByToken
} from '../../../api/queries'
import isAuthenticated from '../../../common/common'
import LoginForm from '../../../components/Forms/LoginForm'
import { ServerResponseContext } from '../../../context/ServerResponseProvider'

class Login extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      identity: '',
      password: '',
      redirectToReferrer: false
    };
    [, this.dispatch] = context
  }

  componentDidMount() {
    if (isAuthenticated()) {
      this.setState({ redirectToReferrer: true })
    }
  }

  /**
   *
   */
  onChangeHandler = (e) => {
    const { name: target, value } = e.target
    const [{ formErrors }, dispatch] = this.context

    this.setState({
      [target]: value
    })

    if (Object.keys(formErrors).length > 0) {
      dispatch({
        type: 'updateFormErrors',
        updatedFormErrors: {}
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


    login
      .then(async () => {
        if (isAuthenticated()) {
          const roles = await this.roles()
          const perms = await this.perms()
          return { roles, perms }
        }
        return {}
      })
      .then((data) => {
        this.setRolesToLocalStorage(data.roles ? data.roles : [])
        this.setPermsToLocalStorage(data.perms ? data.perms : [])
        this.setState({
          redirectToReferrer: true
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  /**
   *
   */
  setBaseDataToLocalStorage = (data) => {
    Object.keys(data).forEach((key) => localStorage.setItem(key, data[key]))
  };

  /**
   *
   */
  setRolesToLocalStorage = ({ data: roles }) => {
    const rolesData = roles.map(({ id, name }) => ({ id, name }))
    localStorage.setItem('roles', JSON.stringify(rolesData))
  };

  /**
   *
   */
  setPermsToLocalStorage = ({ data: permissions }) => {
    const permissionsName = permissions.map(({ name }) => name)
    localStorage.setItem('permissions', JSON.stringify(permissionsName))
  };

  /**
   *
   */
  login = (data) => userLogin(data, this.dispatch)
    .then((json) => {
      if ('success' in json) {
        return this.setBaseDataToLocalStorage(json.data)
      }
      return json.data
    })
    .catch((error) => error)

  /**
   *
   */
  roles = () => userRolesByToken(this.dispatch)
    .then((json) => json)
    .catch((error) => error)


  /**
   *
   */
  perms = () =>
    userPermissionsByToken(this.dispatch)
      .then((json) => json)
      .catch((error) => error);

  render() {
    const from = '/customer/'
    const { redirectToReferrer, identity, password } = this.state
    const [{ formErrors }] = this.context

    if (redirectToReferrer) {
      console.log('wrfrefref')
      return <Redirect to={from} />
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
export default Login

Login.contextType = ServerResponseContext
