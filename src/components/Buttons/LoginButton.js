import React from "react";
import {
    Nav,
    Button,
  } from "tabler-react";

const LoginButton = () => {
    return (
        <Nav.Item type="div" className="d-none d-md-flex">
            <Button href="/user/login" size="l" RootComponent="a" color="info">
            Sign In
            </Button>
        </Nav.Item>
)}

export default LoginButton