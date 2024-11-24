import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { fetchLoggedInUserAsync } from './app/slices/authSlice';
import store from './app/store';
import App from './App';
import './index.css';

(async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));

  try {
    const userId = localStorage.getItem('loggedInUserId');

    if (userId) {
      await store.dispatch(fetchLoggedInUserAsync(userId)).unwrap();
    }
  } catch (error) {
    console.log(error);
  }

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
})();
