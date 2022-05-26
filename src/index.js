import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store';
import App from './components/App';
import ErrorBoundary from './components/ErrorBoundary';
import './style/index.css';
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ErrorBoundary>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>
);
