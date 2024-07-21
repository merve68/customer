import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([{ username: 'admin', password: 'password' }]);
  const [user, setUser] = useState(null);

  const login = ({ username, password }) => {
    const existingUser = users.find(u => u.username === username && u.password === password);
    if (existingUser) {
      setUser({ username });
      return true;
    }
    return false;
  };

  const register = ({ username, password }) => {
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
      return false;
    }
    setUsers([...users, { username, password }]);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
