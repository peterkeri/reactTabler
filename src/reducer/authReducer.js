import {
  isAuthenticated,
  setBaseDataToLocalStorage,
  setRolesToLocalStorage,
  setPermsToLocalStorage
} from '../common/common';

const reset = () => ({
  access_token: '',
  token_type: '',
  expires_at: '',
  roles: [],
  premissions: []
});
const setToken = (state, { updateToken }) => {
  setBaseDataToLocalStorage(updateToken);
  return ({ ...state, ...updateToken });
};

const actions = {
  reset,
  setToken
};

const authReducer = (state, action) => {
  if (action && action.type && actions[action.type]) {
    return actions[action.type](state, action);
  }
  return { ...state };
};


export default authReducer;
