import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import GlobalStyles from '~/component/GlobalStyles';
import AuthContextProvider from './actions/context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <GlobalStyles>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    </GlobalStyles>
  //</React.StrictMode>
);
