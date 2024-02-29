import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { CustomProvider } from 'rsuite';
import ruRU from 'rsuite/locales/ru_RU';
import locales from './locales';
import Frame from './components/Frame';
import DashboardPage from './pages/dashboard';
import Error404Page from './pages/authentication/404';
import Error500Page from './pages/authentication/500';
import SignInPage from './pages/authentication/sign-in';
import SignUpPage from './pages/authentication/sign-up';
import CalendarPage from './pages/calendar';
import CommandPage from './pages/command';
import RequirePage from './pages/require/inqueue';
import SolvedPage from './pages/require/solved';
import IndexPage from './pages/indexPage/indexPage';
import ManageUsers from './pages/manageUsers';
import { appNavsAdmin, appNavsUser } from './config';
import RequireAuth from './components/RequireAuth';
import { AuthContext } from '@/context/AuthProvider';

const App = () => {
  const { auth } = useContext(AuthContext);
  const appNavs = auth?.user?.role === 'admin' ? appNavsAdmin : appNavsUser;

  return (
    <IntlProvider locale="ru" messages={locales.ru}>
      <CustomProvider locale={ruRU}>
        <Routes>
          {/* public Routes  */}
          <Route path="/" element={<IndexPage />} />
          <Route path="/error-404" element={<Error404Page />} />
          <Route path="/error-500" element={<Error500Page />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          {/* private Routes */}
          <Route path="/" element={<Frame navs={appNavs} />}>
            <Route element={<RequireAuth AllowedRoles={['admin']} />}>
              <Route path="/inqueue" element={<RequirePage />} />
              <Route path="/solved" element={<SolvedPage />} />
              <Route path="/command" element={<CommandPage />} />
              <Route path="/manageUsers" element={<ManageUsers />} />
            </Route>
            <Route element={<RequireAuth AllowedRoles={['admin', 'teacher']} />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
            </Route>
          </Route>
          {/* catch all  */}
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </CustomProvider>
    </IntlProvider>
  );
};

export default App;
