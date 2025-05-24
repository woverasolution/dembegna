"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin as apiLoginAdmin } from '../lib/auth'; 
import type { LoginAdminData, AdminLoginResponse } from '@dembegna/shared-types';

// Type for the user object we'll store in context (simplified from full AdminUser if needed)
// For now, let's use a part of AdminUser that the login response provides.
export type AuthUser = AdminLoginResponse['user']; // Matches the user object from loginAdmin response

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginAdminData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start as true to check localStorage
  const router = useRouter();

  useEffect(() => {
    // Check localStorage on initial mount
    try {
      const storedToken = localStorage.getItem('adminAuthToken');
      const storedUserString = localStorage.getItem('adminUser');
      
      if (storedToken && storedUserString) {
        const storedUser: AuthUser = JSON.parse(storedUserString);
        setToken(storedToken);
        setUser(storedUser);
      } else {
        // If either is missing, clear both to be safe
        localStorage.removeItem('adminAuthToken');
        localStorage.removeItem('adminUser');
      }
    } catch (error) {
      console.error("Error reading auth data from localStorage:", error);
      localStorage.removeItem('adminAuthToken');
      localStorage.removeItem('adminUser');
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginAdminData) => {
    setIsLoading(true);
    try {
      const loginResponse = await apiLoginAdmin(credentials);
      if (loginResponse.token && loginResponse.user) {
        setToken(loginResponse.token);
        setUser(loginResponse.user);
        localStorage.setItem('adminAuthToken', loginResponse.token);
        localStorage.setItem('adminUser', JSON.stringify(loginResponse.user));
        // No router.push here, the page calling login will handle redirection
      } else {
        // This shouldn't be reached if apiLoginAdmin throws error for bad responses
        throw new Error("Login successful but token or user missing in response from apiLoginAdmin.");
      }
    } catch (error) {
      // Error is re-thrown so the calling component (e.g., LoginPage) can handle it (e.g., show toast)
      console.error("AuthContext login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('adminAuthToken');
    localStorage.removeItem('adminUser');
    router.push('/login'); // Redirect to login on logout
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!token && !!user, // Derived from token and user state
      isLoading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 