import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store.ts';

// Import Component Screens
import { AuthStack } from './auth/index.ts';

export default function App() {
  return (
    <Provider store={store}>
      <AuthStack />
    </Provider>
  );
}
