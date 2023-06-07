import { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, StatusBar, Animated,Platform } from 'react-native';
import * as Font from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './src/screens/startscreen/StartScreen';
import LoadingScreen from './src/screens/loadingscreen/LoadingScreen';
import LoginScreen from './src/screens/loginscreen/LoginScreen';
import SignUp1Screen from './src/screens/signupscreens/signupstep1/SignUp1';
import SignUp2Screen from './src/screens/signupscreens/signupstep2/SignUp2';
import SignUp3Screen from './src/screens/signupscreens/signupstep3/SignUp3';
import ProfileScreen from './src/screens/profilescreen/ProfileScreen';
import WalkingScreen from './src/screens/walkingscreen/WalkingScreen';
import QuizScreen from './src/screens/quizscreen/QuizScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  if (Platform.OS === 'android') {
     NavigationBar.setVisibilityAsync("hidden");
    }

  useEffect(() => {
    const timer = setTimeout(() => {
      loadFonts();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const loadFonts = async () => {
    if (Platform.OS === 'android') {
    await NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBackgroundColorAsync('#CEE7ED');
    await NavigationBar.setBehaviorAsync('overlay-swipe');
    }
    
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
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Quiz"
            component={QuizScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp1"
            component={SignUp1Screen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp2"
            component={SignUp2Screen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp3"
            component={SignUp3Screen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Walking"
            component={WalkingScreen}
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