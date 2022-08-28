import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {QueryClient, QueryClientProvider} from 'react-query';
import {CookiesProvider} from 'react-cookie';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'jotai';
import theme from './theme';
import {SnackbarProvider} from 'notistack';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <CookiesProvider>
    <ThemeProvider theme={theme}>
      <Provider>
        <Router basename={"/turn-tracker"}>
          <SnackbarProvider>
            <QueryClientProvider client={new QueryClient()}>
              <CssBaseline/>
              <App/>
            </QueryClientProvider>
          </SnackbarProvider>
        </Router>
      </Provider>
    </ThemeProvider>
  </CookiesProvider>
);
