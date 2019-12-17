import { secureFetch } from './secureFetch'
/* global localStorage */
/**
 * GARNET API queries
 */


const headersWidthAuth = (tokenType, accessToken) => ({
  'Authorization': `${tokenType} ${accessToken}`,
  'Accept': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/json'
})
const headers = {
  'Accept': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/json'
}

/**
 * User login
 *
 * @param { email, password, remember_me } data
 *
 */

export const userLogin = (data) => secureFetch('/user/login', 'POST', headers, JSON.stringify(data))
  .then(res => res)
  .catch(error => error)

/**
 *
 * User logout
 *
 */

export const userLogout = () => (
  secureFetch('/user/logout', 'POST', headersWidthAuth(localStorage.getItem('token_type'), localStorage.getItem('access_token')))
    .then(res => res)
    .catch(error => error)

)

/**
 * User reset password
 *
 * @param { email } data
 *
 */

export const resetPasswordRequest = (data) => secureFetch('/user/password/reset/create', 'POST', headers, JSON.stringify(data))
  .then(res => res)
  .catch(error => error)

/**
 * 
 * @param {*} token 
 */

export const userActivate = (token) => secureFetch(`/user/signup/activate/${token}`,'GET', headers)
  .then(res => res)
  .catch(error => error)

/**
 * Find user by token
 *
 * @param { token } token
 *
 */

export const findByToken = (token) => secureFetch(`/user/password/reset/find/${token}`,'GET', headers)
  .then(res => res)
  .catch(error => error)

/**
 * Reset Password
 * @param { token, password, password_confirmation, email } data
 *
 */

export const resetPassword = (data) => secureFetch('/user/password/reset', 'POST', headers, JSON.stringify(data))
  .then(res => res)
  .catch(error => error)

/**
 * User Sign up
 *
 * @param { email, password, password_confirmation, role_id } data
 *
 */

export const userSignup = (data) => secureFetch('/user/signup', 'POST', headers, JSON.stringify(data))
  .then(res => res)
  .catch(error => error)
