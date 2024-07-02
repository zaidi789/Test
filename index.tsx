/**
 * @format
 */

 import { AppRegistry } from 'react-native';
 import { FunctionComponent } from 'react'; 
 
 import App from './App';
 import { name as appName } from './app.json';
 
 const appEntryPoint: FunctionComponent<any> = () => <App />;
 
 AppRegistry.registerComponent(appName, () => appEntryPoint);
 