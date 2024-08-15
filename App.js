import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Alert } from 'react-native';
import * as Font from 'expo-font'; 
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import Login from './screens/Login';
import Forget from './screens/Forget';
import Twofactor from './screens/Twofactor';
import DrawerNavigator from './DrawerNavigator';
import { ThemeProvider } from './ThemeContext'; 

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

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
    return enabled;
  };

  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadFonts();

        const hasPermission = await requestUserPermission();
        if (hasPermission) {
          messaging()
            .getToken()
            .then((token) => {
              console.log(token);
            });
        } else {
          console.log("Permission not granted");
        }

        messaging()
          .getInitialNotification()
          .then(async (remoteMessage) => {
            if (remoteMessage) {
              console.log(
                "Notification caused app to open from quit state:",
                remoteMessage.notification
              );
            }
          });

        messaging().onNotificationOpenedApp((remoteMessage) => {
          console.log(
            "Notification caused app to open from background state:",
            remoteMessage.notification
          );
        });

        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
          console.log("Message handled in the background!", remoteMessage);
        });

        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
          Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
        });

        return unsubscribe;
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
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Forget"
            component={Forget}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Twofactor"
            component={Twofactor}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </ThemeProvider>
  );
}
