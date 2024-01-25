import React from 'react';
import ReactDOM, {Root} from 'react-dom/client';
import App from './App';
import { GeistProvider, CssBaseline } from '@geist-ui/core'
import * as process from "process";

declare global {
    interface Window {
        API_URL: string;
    }
}

process.env.API_URL ? window.API_URL = process.env.API_URL : window.API_URL = 'http://localhost:8080/api/v1';


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
