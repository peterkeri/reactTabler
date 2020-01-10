import { secureFetch } from "./secureFetch";

//const [, dispatch] = useContext(ServerResponseContext)

const headersWidthAuth = (tokenType, accessToken) => ({
  Authorization: `${tokenType} ${accessToken}`,
  Accept: "application/json",
  "X-Requested-With": "XMLHttpRequest",
  "Content-Type": "application/json"
});
const headers = {
  Accept: "application/json",
  "X-Requested-With": "XMLHttpRequest",
  "Content-Type": "application/json"
};

/**
 * User login
 *
 * @param { email, password, remember_me } data
 *
 */

export const userLogin = (data, dispatch) =>
  secureFetch({
    url: "/auth/user/login",
    method: "POST",
    secureHeaders: headers,
    data: JSON.stringify(data),
    dispatch
  })
    .then(res => res)
    .catch(e => console.log(e));

/**
 *
 * User logout
 *
 */

export const userLogout = () =>
  secureFetch({
    url: "/auth/user/logout",
    method: "POST",
    secureHeaders: headersWidthAuth(
      localStorage.getItem("token_type"),
      localStorage.getItem("access_token")
    )
  })
    .then(res => res)
    .catch(error => error);

/**
 *
 */
export const userDataByToken = () =>
  secureFetch({
    url: "/auth/user/dataByToken",
    method: "POST",
    secureHeaders: headersWidthAuth(
      localStorage.getItem("token_type"),
      localStorage.getItem("access_token")
    )
  })
    .then(res => res)
    .catch(error => error);

/**
 *
 */
export const userRolesByToken = () =>
  secureFetch({
    url: "/auth/user/rolesByToken",
    method: "POST",
    secureHeaders: headersWidthAuth(
      localStorage.getItem("token_type"),
      localStorage.getItem("access_token")
    )
  })
    .then(res => res)
    .catch(error => error);

/**
 *
 */
export const userPermissionsByToken = () =>
  secureFetch({
    url: "/auth/user/permissionsByToken",
    method: "POST",
    secureHeaders: headersWidthAuth(
      localStorage.getItem("token_type"),
      localStorage.getItem("access_token")
    )
  })
    .then(res => res)
    .catch(error => error);

/**
 *
 */
export const getPublicMenu = () =>
  secureFetch({ url: `/getPublicMenu`, method: "GET", secureHeaders: headers })
    .then(res => res)
    .catch(error => error);

export const getAuthenticatedMenu = () =>
  secureFetch({
    url: "/getAuthenticatedMenu",
    method: "POST",
    secureHeaders: headersWidthAuth(
      localStorage.getItem("token_type"),
      localStorage.getItem("access_token")
    )
  })
    .then(res => res)
    .catch(error => error);

/**
 * User reset password
 *
 * @param { email } data
 *
 */

export const resetPasswordRequest = (data, dispatch) =>
  secureFetch({
    url: "/auth/user/password/reset/create",
    method: "POST",
    secureHeaders: headers,
    data: JSON.stringify(data),
    dispatch
  })
    .then(res => res)
    .catch(e => e);

/**
 *
 * @param {*} token
 */

export const userActivate = token =>
  secureFetch({
    url: `/user/signup/activate/${token}`,
    method: "GET",
    secureHeaders: headers
  })
    .then(res => res)
    .catch(error => error);

/**
 * Find user by token
 *
 * @param { token } token
 *
 */

export const findByToken = token =>
  secureFetch({
    url: `/user/password/reset/find/${token}`,
    method: "GET",
    secureHeaders: headers
  })
    .then(res => res)
    .catch(error => error);

/**
 * Reset Password
 * @param { token, password, password_confirmation, email } data
 *
 */

export const resetPassword = data =>
  secureFetch({
    url: "/user/password/reset",
    method: "POST",
    secureHeaders: headers,
    data: JSON.stringify(data)
  })
    .then(res => res)
    .catch(error => error);

/**
 * User Sign up
 *
 * @param { email, password, password_confirmation, role_id } data
 *
 */

export const userSignup = data =>
  secureFetch({
    url: "/user/signup",
    method: "POST",
    secureHeaders: headers,
    data: JSON.stringify(data)
  })
    .then(res => res)
    .catch(error => error);
