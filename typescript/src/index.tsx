import React from 'react';
import ReactDOM, {Root} from 'react-dom/client';
import App from './App';
import { GeistProvider, CssBaseline } from '@geist-ui/core'

declare global {
    interface Window {
        API_URL: string;
    }
}

const root: Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <GeistProvider themeType={'dark'}>
          <CssBaseline />
          <App />
      </GeistProvider>
  </React.StrictMode>
);
