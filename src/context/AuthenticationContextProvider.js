import React, { createContext, useReducer } from "react";

export const AuthenticationContext = createContext();

const AuthenticationContextProvider = ({ reducer, initialState, children }) => {
  const contextValue = useReducer(reducer, initialState);

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
