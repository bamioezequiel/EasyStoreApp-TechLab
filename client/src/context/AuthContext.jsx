import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Estado para saber si está autenticado y guardar info usuario
  const [user, setUser] = useState(() => {
    // Leer usuario guardado en localStorage (persistencia)
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Guardar user en localStorage cuando cambia
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Función para login (mock)
  const login = ({ email, password }) => {
    // Aquí validás contra API o mock de credenciales
    if (email === 'admin@admin.com' && password === 'admin') {
      const loggedUser = { email };
      setUser(loggedUser);
      return true; // login exitoso
    }
    return false; // login fallido
  };

  // Función para logout
  const logout = () => {
    setUser(null);
  };

  // Estado booleano para saber si está autenticado
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para consumir el contexto fácilmente
export function useAuth() {
  return useContext(AuthContext);
}
