import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Pressable, KeyboardAvoidingView, Keyboard } from "react-native";
import StartScreenCss from './StartScreenCss';

const StartScreen = ({navigation}) => {
  return (
    <>
    <View style={StartScreenCss.container10}></View>
    
      <View style={StartScreenCss.container40}>
        <Image style={StartScreenCss.headerImagestyle} source={require("../../../assets/smallLogo.png")} />
      </View>
      <View style={StartScreenCss.container10}>
        <Text style={StartScreenCss.texts2}>Meld je aan en ga direct van start met een leuke wandeling</Text>
      </View>
      <View style={StartScreenCss.container8}>
        <Pressable style={StartScreenCss.button} onPress={() => navigation.navigate("Login", { email: "jordyhu@live.nl" })}>
          <Text style={StartScreenCss.texts3}>Inloggen</Text>
        </Pressable>
      </View>
      <View style={StartScreenCss.container8}>
        <Pressable style={StartScreenCss.button} onPress={() => navigation.navigate("SignUp email", { email: "jordyhu@live.nl" })}>
          <Text style={StartScreenCss.texts3}>Aanmelden</Text>
        </Pressable>
      </View>
      <View keyboardVerticalOffset style={StartScreenCss.container15}>
        <Text style={[StartScreenCss.texts3, { color: "#336C70" }]}>Gebruikersvoorwaarde</Text>
      </View>
      <View style={StartScreenCss.container9}></View>
    </>
  );
};

export default StartScreen;