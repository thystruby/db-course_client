import React, { useState, useEffect } from 'react';
import 'styles/tailwind.css';
import './styles/global.scss';
import { Switch, Route } from 'react-router-dom';
import { clients } from 'services/clients.config';
import { ProtectedRoute } from 'components/ProtectedRoute';
import { routes } from 'routes';
import { User } from 'services/UsersService';
import { NoMath } from 'pages/NoMath';

type AuthContext = {
  authorized: boolean;
  onAuth(token: string): void;
  onLogout(): void;
};

type AppContext = {
  user: User;
};

export const AuthContext = React.createContext<AuthContext>({} as AuthContext);
export const AppContext = React.createContext<AppContext>({} as AppContext);

const App: React.FC = () => {
  const [authorized, setAuthorized] = useState(!!localStorage.getItem('token'));
  const [user, setUser] = useState<User>();

  const verifyUser = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      const { data } = await clients.users.getByToken({ token });

      setUser(data.user);
      setAuthorized(true);
    }
  };

  const handleAuth = (token: string) => {
    localStorage.setItem('token', token);

    verifyUser();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');

    setAuthorized(false);
  };

  useEffect(() => {
    verifyUser();
  }, []);

  const routesContent = (
    <Switch>
      {routes.map(({ path, page: Page, protected: p }) =>
        p ? (
          <ProtectedRoute path={path} key={path} exact>
            <Page />
          </ProtectedRoute>
        ) : (
          <Route key={path} path={path} exact>
            <Page />
          </Route>
        )
      )}
      <Route>
        <NoMath />
      </Route>
    </Switch>
  );

  return (
    <>
      <AuthContext.Provider
        value={{ authorized, onAuth: handleAuth, onLogout: handleLogout }}
      >
        {user && authorized ? (
          <AppContext.Provider value={{ user }}>
            {routesContent}
          </AppContext.Provider>
        ) : (
          routesContent
        )}
      </AuthContext.Provider>
    </>
  );
};

export { App };
