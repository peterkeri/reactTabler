const isAuthenticated = () => {
  if (localStorage.getItem('access_token')) {
    return true
  }
  return false
}

export default isAuthenticated
