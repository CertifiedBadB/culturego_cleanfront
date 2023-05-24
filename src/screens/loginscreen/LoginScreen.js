import { useEffect, useState,Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Pressable,KeyboardAvoidingView,Keyboard,ScrollView   } from "react-native";
import StartScreenCss from './LoginScreenCss';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const LoginScreen = () => {
  
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [fieldsAreOk, setFieldsAreOk] = useState(false);
    const [bearerToken, setBearer] = useState([]);
    const [i, seti] = useState(0);

    const checkFields = (text) =>{
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(text) === true){
        setFieldsAreOk(true);
      }
      else{     
      } 
    }


  return (
    <>
        <View style={StartScreenCss.container10}></View>
        <View style={StartScreenCss.container40}>
          <Image style={StartScreenCss.headerImagestyle} source={require("../../../assets/smallLogo.png")} />
        </View>
        <View style={StartScreenCss.container10}>
          <Text style={StartScreenCss.texts2}>Meld je aan en ga direct van start met een leuke wandeling.</Text>
        </View>
        <View style={[StartScreenCss.container9]}>
          <TextInput style={StartScreenCss.input} placeholder="E-mailadres" keyboardType="email-address" onChangeText={text => checkFields(text)} />
        </View>
        <View style={[StartScreenCss.container9]}>
          <TextInput style={StartScreenCss.input} placeholder="Wachtwoord" keyboardType="email-address" secureTextEntry onChangeText={text => checkFields(text)} />
        </View>
        <View style={[StartScreenCss.container15]}>
          <Pressable style={StartScreenCss.button}>
            <Text style={[StartScreenCss.texts3]}>Ga verder</Text>
          </Pressable>
        </View>
        <View style={StartScreenCss.container30}></View>
        </>

  );
};

export default LoginScreen;