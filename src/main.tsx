import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import App from 'src/App';
import './css/normalize.css';
import './css/global.css';
import Spotify from './components/system/apps/Spotify/frontend/Spotify';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Spotify />
  </StrictMode>
);
