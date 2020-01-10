const updateServerResponse = (state, { updateResponse }) => {
    return {
        ...state,
        serverResponse: {
            type: updateResponse.type,
            message: updateResponse.message
        }
    }
}

const updateFormErrors = (state, { updateFormErrors }) => {
    return {
        ...state,
        formErrors: updateFormErrors
    }
}

const actions = {
    updateServerResponse,
    updateFormErrors
}

export const errorReducer = (state, action) => {
    if(action && action.type && actions[action.type]) {
        return actions[action.type](state, action)
    }
    return {...state}
}