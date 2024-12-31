import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a Context for authentication
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  // Fetch the user from localStorage or API on load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // You may fetch the user from an API as well
    }
  }, []);

  // Function to log in the user
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Function to log out the user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
