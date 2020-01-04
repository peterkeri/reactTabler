import React, { Component } from "react";
import {
  userLogin,
  userRolesByToken,
  userPermissionsByToken
} from "../../../api/queries";
import { Redirect } from "react-router-dom";
import { Form, Container, Grid, Button, Card } from "tabler-react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identity: "",
      password: "",
      redirectToReferrer: false
    };
  }

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
        const roles = await this.roles();
        const perms = await this.perms();
        return { roles, perms };
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
      .then(json => json.data)
      .then(data => this.setBaseDataToLocalStorage(data))
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
    const { from } = location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return <Redirect to={from.pathname} />;
    }

    return (
      <Container className="pt-5">
        <Grid.Row justifyContent="center">
          <Grid.Col md={6}>
            <Card>
              <Card.Header>
                <Card.Title>Login</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <Form.Input
                      icon="user"
                      size="sm"
                      name="identity"
                      placeholder="Email or Client number"
                      value={this.state.identity}
                      onChange={this.onChangeHandler}
                    />
                  </Form.Group>

                  <Form.Group label="">
                    <Form.Input
                      icon="lock"
                      type="password"
                      size="sm"
                      name="password"
                      value={this.state.password}
                      placeholder="Password"
                      onChange={this.onChangeHandler}
                    />
                  </Form.Group>

                  <Form.Group label="" className="text-right">
                    <Button type="submit" size="sm" color="primary">
                      Login
                    </Button>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Container>
    );
  }
}

export default Login;
