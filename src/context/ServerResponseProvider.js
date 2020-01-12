import React, { createContext, useReducer } from 'react'

export const ServerResponseContext = createContext()

const ServerResponseProvider = ({ reducer, initialState, children }) => {
  const contextValue = useReducer(reducer, initialState)

  return (
    <ServerResponseContext.Provider value={contextValue}>{children}</ServerResponseContext.Provider>
  )
}

export default ServerResponseProvider
