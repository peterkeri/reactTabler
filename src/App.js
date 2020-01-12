import * as React from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { Error404Page } from 'tabler-react'
import ServerResponseProvider from './context/ServerResponseProvider'
import AuthenticationContextProvider from './context/AuthenticationContextProvider'
import PublicHome from './pages/Public/Home'
import ProtectedHome from './pages/Protected/Home'
import Login from './pages/Core/Auth/Login'
import ResetPasswordRequest from './pages/Core/Auth/ResetPasswordRequest'
import ResetPasswordCheckToken from './pages/Core/Auth/ResetPasswordCheckToken'
import ResetPassword from './pages/Core/Auth/ResetPassword'
import { isAuthenticated } from './common/common'
import errorReducer from './reducer/errorReducer'
import authReducer from './reducer/authReducer'

import 'tabler-react/dist/Tabler.css'
import './App.css'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      (isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/user/login',
            state: { from: props.location }
          }}
        />
      ))}
  />
)

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.shape().isRequired
}

const App = () => (
  <AuthenticationContextProvider
    initialState={{
      access_token: localStorage.getItem('access_token') || '',
      token_type: localStorage.getItem('token_type') || '',
      expires_at: localStorage.getItem('expires_at') || '',
      roles: [],
      permissions: []
    }}
    reducer={authReducer}
  >
    <ServerResponseProvider
      initialState={{
        serverResponse: {
          type: '',
          message: ''
        },
        formErrors: {}
      }}
      reducer={errorReducer}
    >
      <Router>
        <Switch>
          <Route exact path="/" component={PublicHome} />
          <Route path="/user/login" component={Login} />
          <Route
            path="/user/request/password/reset"
            component={ResetPasswordRequest}
          />
          <Route
            path="/user/request/password/check/:token"
            component={ResetPasswordCheckToken}
          />
          <Route path="/user/password/reset" component={ResetPassword} />
          <PrivateRoute path="/customer/" exact component={ProtectedHome} />
          <Route component={Error404Page} />
        </Switch>
      </Router>
    </ServerResponseProvider>
  </AuthenticationContextProvider>
)

export default App
