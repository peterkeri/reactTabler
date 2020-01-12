export const isAuthenticated = () => {
  if (localStorage.getItem('access_token')) {
    return true
  }
  return false
}

/**
 *
 */
export const setBaseDataToLocalStorage = (data) => {
  Object.keys(data).forEach((key) => localStorage.setItem(key, data[key]))
  return data
}

/**
 *
 */
export const setRolesToLocalStorage = ({ data: roles }) => {
  const rolesData = roles.map(({ id, name }) => ({ id, name }))
  localStorage.setItem('roles', JSON.stringify(rolesData))
}

/**
 *
 */
export const setPermsToLocalStorage = ({ data: permissions }) => {
  const permissionsName = permissions.map(({ name }) => name)
  localStorage.setItem('permissions', JSON.stringify(permissionsName))
}
