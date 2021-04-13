<p align="center">
  <a href="https://id6.io">
    <img alt="id6-logo" src="https://raw.githubusercontent.com/id6/id6-brand/latest/logo/id6-logo-purple.svg" width="100"/>
  </a>
</p>
<h1 align="center">id6-express</h1>
<p align="center">React integration for id6</p>

[![NPM](https://img.shields.io/npm/v/id6/react.svg)](https://www.npmjs.com/package/@id6/react)

## Install

```bash
npm install --save @id6/react
```

## Usage

```tsx
import React from 'react'
import { AuthProvider, useAuth } from '@id6/react'

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

function App() {
  return (
    <AuthProvider url="http://id6.company.com">
      <Home/>
    </AuthProvider>
  );
}
```

## Development

```bash
npm i
npm start
```

To test the example app:

``` bash
cd example
npm i
npm start
```

## License

MIT © [id6](https://github.com/id6)
