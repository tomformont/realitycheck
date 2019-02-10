import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';

import {
  createStackNavigator,
  createAppContainer,
  defaultNavigationOptions
        } from 'react-navigation';

import Enter from './screens/Enter';
import Choice from './screens/Choice';
import Artificial from './screens/Artificial';
import Real from './screens/Real';
import DashboardArtificial from './screens/DashboardArtificial';
import DashboardReal from './screens/DashboardReal';

console.ignoredYellowBox = ['Remote debugger'];
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);



class MyComponent extends Component {



    componentWillUnmount() {
       StatusBar.setHidden(true);
    }
}

const AppNavigator = createStackNavigator({
  EnterScreen: { screen: Enter },
  ChoiceScreen: { screen: Choice },
  ArtificialScreen: { screen: Artificial},
  RealScreen: { screen: Real},
  DashboardArtificialScreen: { screen: DashboardArtificial},
  DashboardRealScreen: {screen: DashboardReal}
},  { defaultNavigationOptions: {
      header: null
    },
}
);

const App = createAppContainer(AppNavigator);

export default App;
