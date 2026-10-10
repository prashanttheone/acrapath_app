import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Keychain from 'react-native-keychain';

export interface UserData {
  userId: string;
  email: string;
  full_name?: string;
  phone?: string;
  is_recruiter?: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserData | null;
  activeRole: 'recruiter' | 'candidate';
  switchRole: (role: 'recruiter' | 'candidate') => void;
  login: (token: string, user: UserData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [activeRole, setActiveRole] = useState<'recruiter' | 'candidate'>('candidate');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials && credentials.password) {
          setIsAuthenticated(true);
          try {
            if (credentials.username !== 'auth_token') {
              const userData = JSON.parse(credentials.username);
              setUser(userData);
              if (userData.is_recruiter) {
                setActiveRole('recruiter');
              }
            }
          } catch (err) {
            console.error('Failed to parse user data from keychain', err);
          }
        }
      } catch (e) {
        console.error('Keychain load error:', e);
      } finally {
        setIsLoading(false);
      }
    };
    checkToken();
  }, []);

  const login = async (token: string, userData: UserData) => {
    try {
      // Store user data in username field, token in password field
      await Keychain.setGenericPassword(JSON.stringify(userData), token);
      setUser(userData);
      setIsAuthenticated(true);
      if (userData.is_recruiter) {
        setActiveRole('recruiter');
      } else {
        setActiveRole('candidate');
      }
    } catch (e) {
      console.error('Keychain save error:', e);
    }
  };

  const logout = async () => {
    try {
      await Keychain.resetGenericPassword();
      setUser(null);
      setIsAuthenticated(false);
    } catch (e) {
      console.error('Keychain reset error:', e);
    }
  };

  const switchRole = (role: 'recruiter' | 'candidate') => {
    setActiveRole(role);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, activeRole, switchRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
