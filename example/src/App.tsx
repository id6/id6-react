import React from 'react';
import { useAuth } from '@id6/react';
import { AuthProvider } from '../../src';

function Home() {
  const { loading, error, user, signOut } = useAuth();

  const logout = () => {
    signOut().catch(console.error);
  };

  return loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>Error: {error.message}</p>
  ) : (
    <div>
      {user ? (
        <p>
          Signed in as {user.name}
          <button type="button" onClick={logout}>Sign out</button>
        </p>
      ) : (
        <a href={process.env.REACT_APP_ID6_LOGIN_URL}>Sign in</a>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider url={process.env.REACT_APP_ID6_LOGIN_URL!}>
      <Home/>
    </AuthProvider>
  );
}
