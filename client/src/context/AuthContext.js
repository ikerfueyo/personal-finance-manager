import React, { createContext, useReducer } from 'react';
import authReducer from './authReducer';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('token')
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
