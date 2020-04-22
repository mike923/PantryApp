/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/components/App.tsx';
import { name as appName } from './app.json';
import { typography } from './src/components/utils/typography.ts';

typography();

AppRegistry.registerComponent(appName, () => App);
