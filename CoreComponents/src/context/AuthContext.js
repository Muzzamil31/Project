import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Function to log in a user by setting user data
  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    // Provide user state and auth functions to all children components
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};