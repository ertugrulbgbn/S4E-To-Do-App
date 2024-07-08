import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font'; 
import * as SplashScreen from 'expo-splash-screen';

import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Dashboard from './screens/Dashboard';
import Forget from './screens/Forget';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({                                                   
      'CustomFont-Black': require('./assets/fonts/Inter-Black.ttf'),   
      'CustomFont-Bold': require('./assets/fonts/Inter-Bold.ttf'),
      'CustomFont-ExtraBold': require('./assets/fonts/Inter-ExtraBold.ttf'),
      'CustomFont-ExtraLight': require('./assets/fonts/Inter-ExtraLight.ttf'),
      'CustomFont-Light': require('./assets/fonts/Inter-Light.ttf'),
      'CustomFont-Medium': require('./assets/fonts/Inter-Medium.ttf'),
      'CustomFont-Regular': require('./assets/fonts/Inter-Regular.ttf'),
      'CustomFont-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
      'CustomFont-Thin': require('./assets/fonts/Inter-Thin.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">  
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Forget"
          component={Forget}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}