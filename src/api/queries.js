import { secureFetch } from './secureFetch'
import ServerResponseContext from '../context/ServerResponseProvider'
import { useContext } from 'react'

//const [, dispatch] = useContext(ServerResponseContext)

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

export const userLogin = (data, dispatch) => secureFetch('/auth/user/login', 'POST', headers, JSON.stringify(data))
.then(res => res.json())
.then(json => {
  dispatch({
    type: 'updateServerResponse',
    updateResponse: {
      type: "success",
      message: json.message
    }
  })

  dispatch({
    type: 'updateFormErrors',
    updateFormErrors: {}
  })
  
  return json 
})
.catch(async e => {
  const error = await e.json()  

  if(error.errors) {
    dispatch({
      type: 'updateFormErrors',
      updateFormErrors: error.errors
    })
  } else {
    dispatch({
      type: 'updateFormErrors',
      updateFormErrors: {}
    })
  }

  dispatch({
    type: 'updateServerResponse',
    updateResponse: {
      type: "danger",
      message: error.message
    }
  })
})

/**
 *
 * User logout
 *
 */

export const userLogout = () => (
  secureFetch('/auth/user/logout', 'POST', headersWidthAuth(localStorage.getItem('token_type'), localStorage.getItem('access_token')))
    .then(res => res)
    .catch(error => error)

)

/**
 * 
 */
export const userDataByToken = () => (
  secureFetch('/auth/user/dataByToken', 'POST', headersWidthAuth(localStorage.getItem('token_type'), localStorage.getItem('access_token')))
    .then(res => res)
    .catch(error => error)
)

/**
 * 
 */
export const userRolesByToken = () => (
  secureFetch('/auth/user/rolesByToken', 'POST', headersWidthAuth(localStorage.getItem('token_type'), localStorage.getItem('access_token')))
    .then(res => res)
    .catch(error => error)
)

/**
 * 
 */
export const userPermissionsByToken = () => (
  secureFetch('/auth/user/permissionsByToken', 'POST', headersWidthAuth(localStorage.getItem('token_type'), localStorage.getItem('access_token')))
    .then(res => res)
    .catch(error => error)
)

/**
 * 
 */
export const getPublicMenu = () => secureFetch(`/getPublicMenu`,'GET', headers)
  .then(res => res)
  .catch(error => error)


export const getAuthenticatedMenu = () => ( 
  secureFetch('/getAuthenticatedMenu', 'POST', headersWidthAuth(localStorage.getItem('token_type'), localStorage.getItem('access_token')))
    .then(res => res)
    .catch(error => error)
)

/**
 * User reset password
 *
 * @param { email } data
 *
 */

export const resetPasswordRequest = (data, dispatch) => secureFetch('/auth/user/password/reset/create', 'POST', headers, JSON.stringify(data))
  .then(res => res.json())
  .then(json => {
    dispatch({
      type: 'updateServerResponse',
      updateResponse: {
        type: "success",
        message: json.message
      }
    })

    dispatch({
      type: 'updateFormErrors',
      updateFormErrors: {}
    })
    
    return json 
  })
  .catch(async e => {
    const error = await e.json()  

    if(error.errors) {
      dispatch({
        type: 'updateFormErrors',
        updateFormErrors: error.errors
      })
    } else {
      dispatch({
        type: 'updateFormErrors',
        updateFormErrors: {}
      })
    }

    dispatch({
      type: 'updateServerResponse',
      updateResponse: {
        type: "danger",
        message: error.message
      }
    })
  })

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
