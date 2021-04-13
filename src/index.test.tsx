import { AuthProvider, useAuth } from './index';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import React from 'react';

describe('index', () => {
  describe('', () => {
    let container: HTMLDivElement = null;

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    afterEach(() => {
      unmountComponentAtNode(container);
      container.remove();
      container = null;
      jest.resetAllMocks();
    });

    function TestUser() {
      const { user } = useAuth();
      return <>Name: {user?.name}</>;
    }

    it('should render user data', async () => {
      const fakeUser = {
        name: 'John Smith',
      };
      jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(fakeUser),
        }) as any,
      );

      await act(async () => {
        render(<AuthProvider url='http://id6'><TestUser/></AuthProvider>, container);
      });

      expect(container.textContent).toBe(`Name: ${fakeUser.name}`);
      expect(global.fetch).toHaveBeenCalledWith('http://id6/api/user', {
        credentials: 'include',
      });
    });

    function TestError() {
      const { error } = useAuth();
      return <>Error: {error?.message}</>;
    }

    it('should render error when cannot fetch user', async () => {
      jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.reject(new Error('My error')),
        }) as any,
      );

      await act(async () => {
        render(<AuthProvider url='http://id6'><TestError/></AuthProvider>, container);
      });

      expect(container.textContent).toContain('My error');
    });

    function TestSignout() {
      const { user, signOut } = useAuth();

      const doSignout = () => signOut().catch(console.error);

      return (
        <>
          {user ? (
            <>
              <div>User: ${user?.name}</div>
              <button type="button" onClick={doSignout}>
                Sign out
              </button>
            </>
          ) : (
            <>Sign in</>
          )}
        </>
      );
    }

    it('should sign user out', async () => {
      const fakeUser = {
        name: 'John Smith',
      };
      jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(fakeUser),
        }) as any,
      );

      await act(async () => {
        render(<AuthProvider url='http://id6'><TestSignout/></AuthProvider>, container);
      });

      expect(container.textContent).toContain(fakeUser.name);

      jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(),
        }) as any,
      );

      await act(async () => {
        container.querySelector('button').click();
      });

      expect(container.textContent).toBe(`Sign in`);
      expect(global.fetch).toHaveBeenCalledWith(`http://id6/api/auth/signout`, {
        method: 'post',
        credentials: 'include',
      });
    });
  });
});
