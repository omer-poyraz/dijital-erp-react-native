import React, { useEffect } from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch } from 'react-redux';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import StackNavigator from './src/navigation';
import { store } from './src/redux/store';
import ErrorBoundary from './src/utilities/errorBoundary';
import { enableScreens } from 'react-native-screens';
import LeftMenu from './src/components/header/leftMenu';
import JobAndHold from './src/components/jobAndHold';
import { changeLangs } from './src/redux/slices/langSlice';
import './i18n';

enableScreens();

const LanguageInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeLangs(""));
  }, [dispatch]);

  return null;
};

const App = () => {
  return (
    <ErrorBoundary>
      <StatusBar backgroundColor="#155675" barStyle="#155675" />
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar hidden={false} backgroundColor="#145575" barStyle="light-content" />
          <LanguageInitializer />
          <StackNavigator />
          <LeftMenu />
          <JobAndHold />
        </NavigationContainer>
      </Provider>
    </ErrorBoundary>
  );
};

registerRootComponent(App);

export default App;