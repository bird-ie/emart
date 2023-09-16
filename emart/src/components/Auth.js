import React, { createContext, useContext, useState } from "react";

// Create a context for authentication
const AuthContext = createContext();

// Create an AuthProvider component to wrap your app
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Function to set the authenticated user
  function login(user) {
    setUser(user);
  }

  // Function to log out the user
  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access the authentication context
export function useAuth() {
  return useContext(AuthContext);
}
