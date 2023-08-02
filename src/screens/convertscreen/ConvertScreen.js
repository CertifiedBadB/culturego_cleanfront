import React, { useEffect, useRef, useState, useContext } from "react";
import { Text, View, Image, Pressable, StyleSheet, Animated, useWindowDimensions, ImageBackground,TextInput } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import ConvertScreenCss from './ConvertScreenCss';
import AppContext from "../../../assets/MyContext";
const backgroundImage = require("../../../assets/boz.jpg");
const staticBgImage = require("../../../assets/staticbg.jpg");

const ConvertScreen = ({ navigation }) => {
  const dimensions = useWindowDimensions();
  const windowWidth = dimensions.width;
  const windowHeight = dimensions.height + 85;
  const imageWidth = 4500;
  const initialTranslateX = (windowWidth - imageWidth) * 0.0; // Image will be initially at 30% to the right
  const [pascode,setPasCode] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const translateX = useRef(new Animated.Value(initialTranslateX)).current;
  const { pointsValue, setPointsValue } = useContext(AppContext);
  const { tokenValue, setTokenValue } = useContext(AppContext);
  const { userValue, setUserValue } = useContext(AppContext);

  function toProfile(){
    navigation.navigate('Profile', { value: userValue , tokenValue , points: pointsValue })
  }

  async function convertAndToProfile(){
    try {
      const response = await fetch('https://cultgo.azurewebsites.net/transactions/postTransaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
            Authorization: `Token ${tokenValue}`,
        },
        body: JSON.stringify({
          user: userValue,
          pascode: pascode,
        }),
      });
      console.log(response);
      if (response.ok) {
        setPointsValue(0)
        toProfile();
      } else {

      }
    } catch (error) {

    }
    
  }


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
    <View style={ConvertScreenCss.container}>
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
        {pointsValue > 0 ? (
          <>
          <View style={ConvertScreenCss.container40}>
            <Image style={ConvertScreenCss.headerImagestyle} source={require("../../../assets/smallLogo.png")} />
          </View>
          <View style={ConvertScreenCss.container9}>
            <Text style={ConvertScreenCss.texts2}>Zet je punten om in SamenDoen punten</Text>
          </View>
          <View style={[ConvertScreenCss.container4]} >
        <TextInput style={ConvertScreenCss.input} placeholder="Pasnummer" keyboardType="number-pad" onChangeText={text => [setPasCode(text)]}/>
        </View>
          <View style={ConvertScreenCss.container4}>
            <Pressable style={ConvertScreenCss.button} onPress={() => convertAndToProfile()}>
              <LinearGradient
                colors={['#94A97F', '#758C5E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[StyleSheet.absoluteFill, { color: '#fff' }]}
              ></LinearGradient>
              <Text style={ConvertScreenCss.texts4}>Zet om</Text>
            </Pressable>
          </View>
          <View style={[ConvertScreenCss.container4]} >
        <Pressable style={ConvertScreenCss.button2} onPress={() => toProfile()}>
              <Text style={ConvertScreenCss.texts3}>Terug</Text>
            </Pressable>
        </View>
    
          
          <View keyboardVerticalOffset style={ConvertScreenCss.container15}>

          </View>
          </>
          ) : (
            <>
            <View style={ConvertScreenCss.container40}>
              <Image style={ConvertScreenCss.headerImagestyle} source={require("../../../assets/smallLogo.png")} />
            </View>
            <View style={ConvertScreenCss.container9}>
              <Text style={ConvertScreenCss.texts2}>Helaas u heeft onvoldoende punten verzamelt</Text>
            </View>
            <View style={[ConvertScreenCss.container4]} >
          <Pressable style={ConvertScreenCss.button2} onPress={() => toProfile()}>
                <Text style={ConvertScreenCss.texts3}>Terug</Text>
              </Pressable>
          </View>
      
            
            <View keyboardVerticalOffset style={ConvertScreenCss.container15}>
  
            </View>
            </>
          )}

        </>
      )}
    </View>
  );
};

export default ConvertScreen;