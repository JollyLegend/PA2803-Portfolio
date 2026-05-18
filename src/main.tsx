import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Set favicon dynamically from external hosting
const EXTERNAL_FAVICON = "https://raw.githubusercontent.com/JollyLegend/humplump-pictures/refs/heads/main/favicon.png";
const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
(link as HTMLLinkElement).rel = 'icon';
(link as HTMLLinkElement).href = EXTERNAL_FAVICON;
document.getElementsByTagName('head')[0].appendChild(link);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
