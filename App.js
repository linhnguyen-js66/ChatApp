/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import LoginScreen01 from './src/screen/01-LoginScreen'
import SignUpScreen02 from './src/screen/02-SignUp-Screen/02-SignUp-Screen';
import ChatScreen03 from './src/screen/03-ChatScreen';
import CommentScreen04 from './src/screen/04-CommentScreen';
import {AppNavigator} from './src/navigation/AppNavigator'
const App = () => {
  return (
      <AppNavigator/>
  );
};

export default App;
