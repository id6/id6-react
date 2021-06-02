<p align="center">
  <a href="https://id6.io">
    <img alt="id6-logo" src="https://raw.githubusercontent.com/id6/id6-brand/latest/logo/id6-logo-purple.svg" width="100"/>
  </a>
</p>
<h1 align="center">id6-react</h1>
<p align="center">React integration for id6</p>

<p align="center">
  <img alt="npm" src="https://img.shields.io/npm/v/@id6/react">
</p>

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
        <a href="https://authorize.company.com">Sign in</a>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider url="https://authorize.company.com">
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
