import {
  setBaseDataToLocalStorage
} from '../common/common'

const reset = () => ({
  access_token: '',
  token_type: '',
  expires_at: '',
  roles: [],
  premissions: []
})

const setToken = (state, { updateToken }) => {
  setBaseDataToLocalStorage(updateToken)
  return ({ ...state, ...updateToken })
}

const setRoles = (state, { updateRoles }) => ({ ...state, roles: updateRoles })

const setPerms = (state, { updatePerms }) => ({ ...state, permissions: updatePerms })

const actions = {
  reset,
  setToken,
  setRoles,
  setPerms
}

const authReducer = (state, action) => {
  if (action && action.type && actions[action.type]) {
    return actions[action.type](state, action)
  }
  return { ...state }
}


export default authReducer
