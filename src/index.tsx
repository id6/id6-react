import React, { createContext, useContext, useEffect, useState } from 'react';

export interface User {
  id: string;
  authType: string;
  name: string;
  email?: string;
}

export interface Auth {
  initialized: boolean;
  loading: boolean;
  error: any;
  user: User | null;
  fetchUser: () => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<Auth>(undefined as any);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ url, ...props }: {
  url: string;
  [key: string]: any;
}) {
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [user, setUser] = useState<User | null>(null);

  const signOut = () => {
    return fetch(`${url}/api/auth/signout`, {
      method: 'post',
      credentials: 'include',
    } as any).then(() => {
      setUser(null);
    });
  };

  const fetchUser = () => {
    setLoading(true);
    fetch(`${url}/api/user`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(setUser)
      .catch(setError)
      .finally(() => {
        setInitialized(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        initialized,
        loading,
        error,
        user,
        fetchUser,
        signOut,
      }}
      {...props}
    />
  );
}
