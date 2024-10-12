import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from 'src/App';
import './css/normalize.css';
import './css/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
