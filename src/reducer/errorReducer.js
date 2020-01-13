const updateServerResponse = (state, { updateResponse }) => ({
  ...state,
  serverResponse: {
    type: updateResponse.type,
    message: updateResponse.message
  }
})

const updateFormErrors = (state, { updatedFormErrors }) => ({
  ...state,
  formErrors: updatedFormErrors
})

const actions = {
  updateServerResponse,
  updateFormErrors
}

const errorReducer = (state, action) => {
  if (action && action.type && actions[action.type]) {
    return actions[action.type](state, action)
  }
  return { ...state }
}

export default errorReducer
