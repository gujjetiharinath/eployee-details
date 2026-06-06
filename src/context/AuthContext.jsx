import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for mock token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ email: 'hari27@gmail.com', role: 'admin' });
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login logic
    if (email === 'hari27@gmail.com' && password === 'harinath49') {
      localStorage.setItem('token', 'mock-jwt-token');
      setUser({ email, role: 'admin' });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
