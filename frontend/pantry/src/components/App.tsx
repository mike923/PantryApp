import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store.ts';

// Import Component Screens
import { AuthStack } from './auth/index.ts';
import WelcomeScreen from './Screens/Welcome.tsx';

export default function App() {
  const [show, setshow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setshow(false);
    }, 5000);
  }, [show]);
  return (
    <Provider store={store}>
      {show ? <WelcomeScreen /> : <AuthStack />}
    </Provider>
  );
}
