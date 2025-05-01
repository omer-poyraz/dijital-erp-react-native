import React, { useEffect } from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch } from 'react-redux';
import { StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import StackNavigator from './src/navigation';
import { store } from './src/redux/store';
import ErrorBoundary from './src/utilities/errorBoundary';
import { enableScreens } from 'react-native-screens';
import LeftMenu from './src/components/header/leftMenu';
import JobAndHold from './src/components/jobAndHold';
import { changeLangs } from './src/redux/slices/langSlice';
import './i18n';
import { PaperProvider } from 'react-native-paper';
import * as ScreenCapture from 'expo-screen-capture';

enableScreens();

const LanguageInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeLangs(""));
  }, [dispatch]);

  return null;
};

const App = () => {
  useEffect(() => {
    ScreenCapture.preventScreenCaptureAsync();
  }, []);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PaperProvider>
          <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#00385b" barStyle="dark-content" />
            <NavigationContainer>
              <StatusBar hidden={false} backgroundColor="#145575" barStyle="light-content" />
              <LanguageInitializer />
              <StackNavigator />
              <LeftMenu />
              <JobAndHold />
            </NavigationContainer>
          </SafeAreaView>
        </PaperProvider>
      </Provider>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5'
  },
});

registerRootComponent(App);

export default App;