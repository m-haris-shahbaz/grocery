import React, { createContext, useState, useEffect, useContext } from 'react';
import { checkSession } from './supabase';
import { User } from '@supabase/supabase-js';

// Define context types
type AuthContextType = {
  signedIn: boolean;
  setSignedIn: (signedIn: boolean) => void;
  isLoading: boolean;
  user: any | User; // You could create a proper User type
};

// Create context with default values
export const AuthContext = createContext<AuthContextType>({
  signedIn: false,
  setSignedIn: () => {},
  isLoading: true,
  user: null,
});

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Auth Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  // Check authentication status when the component mounts
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await checkSession();
        setSignedIn(!!session);
        setUser(session?.user || null);
      } catch (error) {
        console.error('Failed to check auth status:', error);
        setSignedIn(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Handle routing based on auth status

  // Provide the context value
  const value = {
    signedIn,
    setSignedIn,
    isLoading,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
