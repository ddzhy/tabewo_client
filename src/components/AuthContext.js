import React, { createContext, useContext, useState } from 'react';
import axios from 'axios'; // axios 추가

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);

  const logout = () => {
    axios.post('http://localhost:8081/logout')
      .then((res) => {
        if (res.data.status === "Success") {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
