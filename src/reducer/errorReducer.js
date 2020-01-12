const updateServerResponse = (state, { updateResponse }) => ({
  ...state,
  serverResponse: {
    type: updateResponse.type,
    message: updateResponse.message
  }
})

const updateFormError = (state, { updateFormErrors }) => ({
  ...state,
  formErrors: updateFormErrors
})

const actions = {
  updateServerResponse,
  updateFormError
}

const errorReducer = (state, action) => {
  if (action && action.type && actions[action.type]) {
    return actions[action.type](state, action)
  }
  return { ...state }
}

export default errorReducer
