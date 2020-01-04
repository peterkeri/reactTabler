import * as React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";

import ClientHome from "./pages/Client/Home";
import AdminHome from "./pages/Admin/Home";
import Login from "./pages/Core/Auth/Login";
import { isAuthenticated } from "./common/common";

import "tabler-react/dist/Tabler.css";

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
              pathname: "/login",
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
    <Router>
      <Switch>
        <Route exact path="/" component={ClientHome} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/admin" exact component={AdminHome} />
      </Switch>
    </Router>
  );
}

export default App;
