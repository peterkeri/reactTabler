import React, { Component } from "react";
import { userLogin } from '../../../api/queries'
import { Form, Container, Grid, Button, Card } from 'tabler-react'


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
          email: '',
          password: '',
        }
      }    

    onChangeHandler = (e) => {
        const { name: target, value } = e.target;

        this.setState({
            [target]: value
        })
    }
    
    /**
     * 
     */
    handleSubmit = (event) => {
        event.preventDefault();

        const formValues = {
            email: this.state.email,
            password: this.state.password
          }
          this.login(formValues)
    }

    /**
     * 
     */
    login = (data) => userLogin(data)
        .then(res => res.json())
        .then(json => {
            if (json.hasOwnProperty('success')) {
                console.log("SUCCESS LOGIN")
            } else {
                console.log("INVALID LOGIN")
            }
        })
        .catch(error => error)

  


    render() {
    return (
        
        <Container className="pt-5">
                <Grid.Row justifyContent="center" >
                <Grid.Col md={6}>
            <Card>
                <Card.Header>
                    <Card.Title>Login</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Input icon="user" name="email" placeholder="Email" value={this.state.email} onChange={this.onChangeHandler} />
                        </Form.Group>

                        <Form.Group label="">
                            <Form.Input icon="lock" type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.onChangeHandler} />
                        </Form.Group>

                        <Button type='submit' block color="primary">Login</Button>
                    </Form>
                </Card.Body>
            </Card>
            </Grid.Col>
            </Grid.Row>

         </Container>
    );
    };
}

export default Login