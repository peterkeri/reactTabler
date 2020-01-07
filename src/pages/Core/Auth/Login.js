import React, { Component } from "react";

import {
  userLogin,
  userRolesByToken,
  userPermissionsByToken
} from "../../../api/queries";
import { Redirect } from "react-router-dom";
import { Container, Grid, Card } from "tabler-react";
import { isAuthenticated } from "../../../common/common";
import LoginForm from '../../../components/Forms/LoginForm'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identity: "",
      password: "",
      formErrors: {},
      redirectToReferrer: false
    };
  }

  /**
   * 
   */
  onChangeHandler = e => {
    const { name: target, value } = e.target;

    this.setState({
      [target]: value
    });
  };

  /**
   *
   */
  handleSubmit = event => {
    event.preventDefault();

    const formValues = {
      identity: this.state.identity,
      password: this.state.password
    };

    const login = this.login(formValues);

    login
      .then(async values => {
        if(isAuthenticated()) {
          const roles = await this.roles();
          const perms = await this.perms();
          return { roles, perms};
        }
      })
      .then(({ roles, perms }) => {
        this.setRolesToLocalStorage(roles ? roles : []);
        this.setPermsToLocalStorage(perms ? perms : []);
        this.setState({
          redirectToReferrer: true
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  /**
   *
   */
  setBaseDataToLocalStorage = data => {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        localStorage.setItem(key, data[key]);
      }
    }
    return data;
  };

  /**
   *
   */
  setRolesToLocalStorage = ({ data: roles }) => {
    const rolesData = roles.map(({ id, name }) => ({ id, name }));
    localStorage.setItem("roles", JSON.stringify(rolesData));
  };

  /**
   *
   */
  setPermsToLocalStorage = ({ data: permissions }) => {
    const permissionsName = permissions.map(({ name }) => name);
    localStorage.setItem("permissions", JSON.stringify(permissionsName));
  };

  /**
   *
   */
  login = data =>
    userLogin(data)
      .then(res => res.json())
      .then(json => {
        if (json.hasOwnProperty('success')) {
          this.setBaseDataToLocalStorage(json.data)
          return json.data
        } else {
          this.setState({
            formErrors: json.errors,
          })
          return json.errors
        }
      })
      .catch(error => error);

  /**
   *
   */
  roles = () =>
    userRolesByToken()
      .then(res => res.json())
      .then(json => json)
      .catch(error => error);

  /**
   *
   */
  perms = () =>
    userPermissionsByToken()
      .then(res => res.json())
      .then(json => json)
      .catch(error => error);

  render() {
    const { location } = this.props;
    const { from } = location.state || { from: { pathname: "/customer/" } };
    const { redirectToReferrer, formErrors, identity, password} = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from.pathname} />;
    }

    return (
      <Container className="h-100">
        <Grid.Row className="h-100" alignItems="center" justifyContent="center">
          <Grid.Col md={6}>
            <Card>
              <Card.Header>
                <Card.Title>Login</Card.Title>
              </Card.Header>
              <Card.Body>
                <LoginForm 
                  identity={identity}
                  password={password}
                  formErrors={formErrors} 
                  handleSubmit={this.handleSubmit} 
                  onChangeHandler={this.onChangeHandler} />
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Container>
    );
  }
}

export default Login;
