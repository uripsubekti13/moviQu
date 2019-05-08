/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

console.disableYellowBox = true;

global.XMLHttpRequest = global.originalXMLHttpRequest ?
  global.originalXMLHttpRequest :
  global.XMLHttpRequest;
global.FormData = global.originalFormData ?
  global.originalFormData :
  global.FormData;

fetch; // Ensure to get the lazy property

// RNDebugger only
if (window.__FETCH_SUPPORT__) {
  window.__FETCH_SUPPORT__.blob = false
}
AppRegistry.registerComponent(appName, () => App);
