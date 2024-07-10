import * as React from 'react';
import { useState } from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper'; // Import DefaultTheme
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ToastProvider } from 'react-native-paper-toast';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import HomeScreen from './screens/HomeScreen';
import AddEntryScreen from './screens/AddEntryScreen';
import EntryDetailScreen from './screens/EntryDetailScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();

const theme = {
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(0, 104, 116)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(151, 240, 255)",
    onPrimaryContainer: "rgb(0, 31, 36)",
    secondary: "rgb(0, 99, 154)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(206, 229, 255)",
    onSecondaryContainer: "rgb(0, 29, 50)",
    tertiary: "rgb(0, 95, 175)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(212, 227, 255)",
    onTertiaryContainer: "rgb(0, 28, 58)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(250, 253, 253)",
    onBackground: "rgb(25, 28, 29)",
    surface: "rgb(250, 253, 253)",
    onSurface: "rgb(25, 28, 29)",
    surfaceVariant: "rgb(219, 228, 230)",
    onSurfaceVariant: "rgb(63, 72, 74)",
    outline: "rgb(111, 121, 122)",
    outlineVariant: "rgb(191, 200, 202)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(46, 49, 50)",
    inverseOnSurface: "rgb(239, 241, 241)",
    inversePrimary: "rgb(79, 216, 235)",
    elevation: {
      level0: "transparent",
      level1: "rgb(238, 246, 246)",
      level2: "rgb(230, 241, 242)",
      level3: "rgb(223, 237, 238)",
      level4: "rgb(220, 235, 237)",
      level5: "rgb(215, 232, 234)"
    },
    surfaceDisabled: "rgba(25, 28, 29, 0.12)",
    onSurfaceDisabled: "rgba(25, 28, 29, 0.38)",
    backdrop: "rgba(41, 50, 52, 0.4)"
  }
};

const styles = StyleSheet.create({
    button: {
      position: 'relative',  
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 20,
      backgroundColor: 'red',
      color: 'white',                                               
    },
    header_view: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingHorizontal: 10,
    }
});

export default function App() {

  const handleLogout = () => {
    localStorage.removeItem('access_token');
  };
  return (
    <PaperProvider theme={theme}>
      <ToastProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen} 
              options={{
                headerRight: () => (
                  <IconButton
                    style={styles.button}
                    icon="power" 
                    mode="contained" 
                    onPress={handleLogout}
                  />
                ),
              }}
            />
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{
                headerRight: () => (
                    <IconButton
                      style={styles.button}
                      icon="power"
                      mode="contained"
                      onPress={handleLogout}
                    />
                ),
              }} 
              />
            <Stack.Screen 
              name="AddEntry" 
              component={AddEntryScreen}
              options={{
                headerRight: () => (
                  <IconButton
                    style={styles.button}
                    icon="power" 
                    mode="contained" 
                    onPress={handleLogout}
                  />
                ),
              }}
            />
            <Stack.Screen 
              name="EntryDetail" 
              component={EntryDetailScreen} 
              options={{
                headerRight: () => (
                  <IconButton
                    style={styles.button}
                    icon="power" 
                    mode="contained" 
                    onPress={handleLogout}
                  />
                ),
              }}
              />
          </Stack.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </PaperProvider>
  );
}
