import React, { Component } from "react";
import { userLogin, userRolesByToken, userPermissionsByToken } from '../../../api/queries'
import { Redirect } from 'react-router-dom'
import { Form, Container, Grid, Button, Card } from 'tabler-react'


const path = localStorage.getItem('role_name') ? localStorage.getItem('role_name').toLowerCase() : 'kkk'
var BASE_PATH = `/${path}`

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            identity: '',
            password: '',
            redirectToReferrer: false
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
            identity: this.state.identity,
            password: this.state.password
          }
          this.login(formValues)
    }

    /**
     * 
     */
    setBaseDataToLocalStorage = (data) => {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                localStorage.setItem(key, data[key])
            }
        }
        return data
    }

    /**
     * 
     */
    setRolesToLocalStorage = (data) => {
        let roles = data.role.map(role => ({ role_id: `${role.id}`, role_name: `${role.name}` }))
        const newData = Object.assign(data, ...roles)
        for (const key in newData) {
            if (newData.hasOwnProperty(key)) {
                localStorage.setItem(key, newData[key])
            }
        }
        return newData
    }

    /**
     * 
     */
    setPermsToLocalStorage = (data) => {
        let permissionsArray = data.permissions.map(permission => permission.name)
        data.permissions = permissionsArray
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                localStorage.setItem(key, data[key])
            }
        }
        return data
    }
    
    /**
     * 
     */
    login = (data) => userLogin(data)
        .then(res => res.json())
        .then(json => {
            if (json.hasOwnProperty('success')) {
                this.setBaseDataToLocalStorage(json.data)
                return userRolesByToken()
            } else {
                throw new Error("bumm")
            }
        }).then(role => {
            console.log(role)
        })
        .catch(error => error)

  


    render() {
        const { location } = this.props
        const { from } = location.state || { from: { pathname: BASE_PATH } }
        const { redirectToReferrer } = this.state
        if (redirectToReferrer) {
            return <Redirect to={from.pathname} />
        }
        

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
                            <Form.Input icon="user" size="sm" name="identity" placeholder="Email or Client number" value={this.state.identity} onChange={this.onChangeHandler} />
                        </Form.Group>

                        <Form.Group label="">
                            <Form.Input icon="lock" type="password" size="sm" name="password" value={this.state.password} placeholder="Password" onChange={this.onChangeHandler} />
                        </Form.Group>

                        <Form.Group label="" className="text-right">
                            <Button  type='submit' size="sm" color="primary">Login</Button>
                        </Form.Group>

                        
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