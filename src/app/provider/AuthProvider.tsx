import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Keychain from 'react-native-keychain';

export interface UserData {
  userId: string;
  email: string;
  full_name?: string;
  phone?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserData | null;
  login: (token: string, user: UserData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
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

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
