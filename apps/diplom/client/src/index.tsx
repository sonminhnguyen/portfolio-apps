import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import App from './App';

import './styles/index.less';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <HashRouter>
        <App />
    </HashRouter>
  </AuthProvider>
);
