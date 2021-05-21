import React from 'react';
import { AuthProvider, useAuth } from '@id6/react';

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
          <a href={process.env.REACT_APP_ID6_LOGIN_URL}>Edit profile</a>
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
