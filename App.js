import { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, StatusBar, Animated } from 'react-native';
import * as Font from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './src/screens/startscreen/StartScreen';
import LoadingScreen from './src/screens/loadingscreen/LoadingScreen';
import LoginScreen from './src/screens/loginscreen/LoginScreen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
    NavigationBar.setBackgroundColorAsync('#CEE7ED');
    await NavigationBar.setBehaviorAsync('overlay-swipe');
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
        <StatusBar translucent backgroundColor="#F5F5F5" />
        <LoadingScreen />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="#F5F5F5" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Startup"
            component={StartScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CEE7ED',
  },
});