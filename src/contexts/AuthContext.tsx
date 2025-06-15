
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'Administrador' | 'Recepcionista';
  fullName: string;
  isActive: boolean;
  lastLogin?: Date;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuarios demo para la demostración
const demoUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@milsabores.com',
    role: 'Administrador',
    fullName: 'Administrador Principal',
    isActive: true,
  },
  {
    id: '2',
    username: 'recepcionista',
    email: 'recepcion@milsabores.com',
    role: 'Recepcionista',
    fullName: 'María González',
    isActive: true,
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage
    const savedUser = localStorage.getItem('milsabores_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulación de autenticación
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = demoUsers.find(u => u.username === username);
    
    if (foundUser && (password === 'admin123' || password === 'recep123')) {
      const userWithLogin = { ...foundUser, lastLogin: new Date() };
      setUser(userWithLogin);
      localStorage.setItem('milsabores_user', JSON.stringify(userWithLogin));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('milsabores_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
