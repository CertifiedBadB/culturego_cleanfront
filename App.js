import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, StatusBar,Animated   } from 'react-native';
import * as Font from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './src/screens/startscreen/StartScreen';
import LoadingScreen from './src/screens/loadingscreen/LoadingScreen';
import LoginScreen from './src/screens/loginscreen/LoginScreen';
import { KeepAwake } from 'expo-keep-awake';
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  NavigationBar.setVisibilityAsync("hidden");
  useEffect(() => {
    const timer = setTimeout(() => {
      loadFonts();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const loadFonts = async () => {
    await NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBackgroundColorAsync('#CEE7ED')
    await NavigationBar.setBehaviorAsync('overlay-swipe')
    await Font.loadAsync({
      'stratos': require('./assets/fonts/Stratos-Regular.ttf'),
    });
    setFontLoaded(true);
  };

  useEffect(() => {
    // Simulating a font loading delay
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000, // Adjust the duration as needed
        useNativeDriver: true,
      }).start();
    }, 2000); // Simulating a loading delay
  }, []);

  if (!fontLoaded) {
    return (
      
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="#CEE7ED" />
        <LoadingScreen />
      </View>
    );
  }

  return ( 
    <NavigationContainer >
      <StatusBar translucent backgroundColor="#CEE7ED" />
      <Stack.Navigator >
      <Stack.Screen 
        name="Startup"
        component={StartScreen}
        options={{headerShown: false}}
        />
      <Stack.Screen 
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
        />
        </Stack.Navigator>
        </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: '#CEE7ED',
    marginTop: StatusBar.currentHeight || 0,
  },
  container: {
    marginTop: StatusBar.currentHeight || 0,
    flex: 1,
    backgroundColor: '#CEE7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
});