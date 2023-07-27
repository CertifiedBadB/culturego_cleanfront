import React, { useEffect, useRef, useState } from "react";
import { Text, View, Image, Pressable, StyleSheet, Animated, useWindowDimensions, ImageBackground } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import StartScreenCss from './StartScreenCss';

const backgroundImage = require("../../../assets/boz.jpg");
const staticBgImage = require("../../../assets/staticbg.jpg");

const StartScreen = ({ navigation }) => {
  const dimensions = useWindowDimensions();
  const windowWidth = dimensions.width;
  const windowHeight = dimensions.height + 85;
  const imageWidth = 4500;
  const initialTranslateX = (windowWidth - imageWidth) * 0.0; // Image will be initially at 30% to the right

  const [isLoaded, setIsLoaded] = useState(false);
  const translateX = useRef(new Animated.Value(initialTranslateX)).current;

  const animateBackground = () => {
    Animated.sequence([
      // Wiggle the image a little bit from left to right
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateX, {
            toValue: (windowWidth - imageWidth) * 1.5 - 20, // Wiggle to the left
            duration: 20000,
            useNativeDriver: false,
          })
        ]),
      ),
    ]).start(() => {
      setIsLoaded(true); // Image animations are completed
    });
  };

  useEffect(() => {
    // Show the image immediately when the component is loaded
    setIsLoaded(true);
    animateBackground();
  }, []);

  return (
    <View style={StartScreenCss.container}>
      {/* Static Background Image */}
      <ImageBackground
        source={staticBgImage}
        style={[
          StyleSheet.absoluteFill,
          {  height: windowHeight, resizeMode: 'contain' }
        ]}
      />

      {/* Animated Background Image */}
      <Animated.Image
        source={backgroundImage}
        style={[
          StyleSheet.absoluteFill,
          { transform: [{ translateX }] },
          { height: windowHeight, resizeMode: 'contain' }
        ]}
      />

      {isLoaded && ( // Render other components when the image animations are completed
        <>
          <View style={StartScreenCss.container40}>
            <Image style={StartScreenCss.headerImagestyle} source={require("../../../assets/smallLogo.png")} />
          </View>
          <View style={StartScreenCss.container10}>
            <Text style={StartScreenCss.texts2}>Ga aan de slag met wandelen. Ontdek leuke culturele plekken bij jou in de buurt</Text>
          </View>
          <View style={StartScreenCss.container8}>
            <Pressable style={StartScreenCss.button} onPress={() => navigation.navigate("Login")}>
              <LinearGradient
                colors={['#94A97F', '#758C5E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[StyleSheet.absoluteFill, { color: '#fff' }]}
              ></LinearGradient>
              <Text style={StartScreenCss.texts4}>Inloggen</Text>
            </Pressable>
          </View>
          <View style={StartScreenCss.container8}>
            <Pressable style={StartScreenCss.button2} onPress={() => navigation.navigate("SignUp1")}>
              <Text style={StartScreenCss.texts3}>Aanmelden</Text>
            </Pressable>
          </View>
          <View keyboardVerticalOffset style={StartScreenCss.container15}>
            <Text style={[StartScreenCss.texts3, { color: "#336C70" }]}>Gebruikersvoorwaarde</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default StartScreen;