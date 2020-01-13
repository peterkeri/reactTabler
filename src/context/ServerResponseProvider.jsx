import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

export const ServerResponseContext = createContext()

const ServerResponseProvider = ({ reducer, initialState, children }) => {
  const contextValue = useReducer(reducer, initialState)

  return (
    <ServerResponseContext.Provider value={contextValue}>{children}</ServerResponseContext.Provider>
  )
}

ServerResponseProvider.propTypes = {
  reducer: PropTypes.shape().isRequired,
  initialState: PropTypes.string.isRequired,
  children: PropTypes.shape().isRequired
}


export default ServerResponseProvider
