import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { AuthProvider } from './context/AuthProvider';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root')); 
const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

root.render(
  <React.StrictMode>
    {/* <AuthProvider> */}
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={window.location.origin}>
        <App />
      </Auth0Provider>
    {/* </AuthProvider> */}
  </React.StrictMode>
);
