import * as React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import ServerResponseProvider from "./context/ServerResponseProvider"
import PublicHome from "./pages/Public/Home";
import ProtectedHome from "./pages/Protected/Home";
import Login from "./pages/Core/Auth/Login";
import ResetPasswordRequest from './pages/Core/Auth/ResetPasswordRequest'
import { Error404Page } from "tabler-react";
import { isAuthenticated } from "./common/common";
import { errorReducer } from './reducer/errorReducer'

import "tabler-react/dist/Tabler.css";
import "./App.css";


const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/user/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

function App() {
  return (
    <ServerResponseProvider initialState={{
      serverResponse: {
        type: "",
        message: ""
      },
      formErrors: {}
    }}
    reducer={errorReducer}
    >
    <Router>
      <Switch>
        <Route exact path="/" component={ PublicHome} />
        <Route path="/user/login" component={Login} />
        <Route path="/user/request/password/reset" component={ResetPasswordRequest} />
        <PrivateRoute path="/customer/" exact component={ProtectedHome} />
        <Route component={Error404Page} />
      </Switch>
    </Router>
    </ServerResponseProvider>
  );
}

export default App;
