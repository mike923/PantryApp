/**
 * @format
 */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../src/components/App.tsx';

// Note: test renderer must be required after react-native.

it('renders correctly', () => {
    renderer.create(<App />);
});
