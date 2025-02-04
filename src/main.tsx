import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import App from 'src/App';
import './css/normalize.css';
import './css/global.css';
import App from './components/system/apps/Spotify/frontend/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
