import React from 'react'
import { 
    NavLink, 
    withRouter } from "react-router-dom";
import { 
    Form, 
    Button } from "tabler-react";


const LoginForm = ({ formErrors, identity, password, handleSubmit, onChangeHandler }) => {
   const onChange = (e) => onChangeHandler(e)
   const onSubmit = (e) => handleSubmit(e)
   return (
    <Form onSubmit={onSubmit}>
        <Form.Group>
            <Form.Input
                icon="user"
                size="sm"
                name="identity"
                error={formErrors.username && formErrors.username[0]}
                placeholder="Email or Client number"
                value={identity}
                onChange={onChange}
            />
        </Form.Group>

        <Form.Group label="">
            <Form.Input
                icon="lock"
                type="password"
                size="sm"
                name="password"
                error={formErrors.password && formErrors.password[0]}
                invalid={formErrors.password && formErrors.password[0] ? true : false}
                value={password}
                placeholder="Password"
                onChange={onChange}
            />
        </Form.Group>

        <Form.Group label="" className="text-right">
            <Button.List>
                <Button size="sm" color="info" RootComponent= { withRouter(NavLink) } to= { "/user/request/password/reset"} >Forgot password?</Button>
                <Button type="submit" size="sm" color="info">Login</Button>
            </Button.List>
        </Form.Group>
    </Form>
)
}   


export default LoginForm