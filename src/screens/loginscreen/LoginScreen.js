import { Text, View, Pressable,StyleSheet,TextInput} from "react-native";
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import LogincreenCss from './LoginScreenCss';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Constants } from 'expo-constants';
import jwtDecode from 'jwt-decode'; 

const Logincreen = ({navigation}) => {
  const [fieldsAreOk, setFieldsAreOk] = useState(false);
  const checkFields = (text) =>{
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === true){
      setFieldsAreOk(true);
    }
    else{
        
    }
    
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const verifyToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const { userId, exp } = decodedToken;
  
      // Perform additional checks as per your requirements
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (exp < currentTimestamp) {
        console.log('Token has expired.');
        return false;
      }
  
      // Perform other checks if needed
  
      return true; // Token is valid
    } catch (error) {
      console.log('Error decoding or verifying token:', error);
      return false;
    }
  };


  const handleLogin = () => {
    login(email, password);
    // Additional logic for navigation or displaying messages
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('https://cultgo.azurewebsites.net/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      if (response.ok) {
        // Login successful, handle the response
        const data = await response.json();
        const UID = data.user
        const { token, userId } = data;
        console.log(data);
        // Verify the token
        const isTokenValid = verifyToken(token);
        if (isTokenValid) {
          // Token is valid, perform further actions
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.id;
          if(userId == UID){
            console.log('User ID:', userId);
            //go to the profile screen
            navigation.navigate('Profile', { value: userId , token })
          }
          
        } else {
          // Token is invalid, handle accordingly
          console.log('Token is invalid.');
        }
      } else {
        // Login failed, handle the error
        console.log('Login failed');
      }
    } catch (error) {
      // Error occurred during login
      console.log('Error:', error);
    }
  };


  
  return (
    <KeyboardAwareScrollView style={LogincreenCss.container}
    resetScrollToCoords={{ x: 0, y: 0 }}
    contentContainerStyle={LogincreenCss.contentContainer}>
      <View style={LogincreenCss.container11}></View>
    <LinearGradient
          colors={['#D9EEED', '#F5F5F5']}
          start={{ x: 0, y: 1.5 }}
          end={{ x: 0, y: 0 }}
          style={[StyleSheet.absoluteFill,{color:'#fff'}]}
        ></LinearGradient>
    
    <View style={LogincreenCss.container8}></View>
      <View style={LogincreenCss.container10}>
        <Text style={LogincreenCss.texts4}>Aanmelden</Text>
      </View>
      
      <View style={LogincreenCss.container10}>
        <Text style={LogincreenCss.texts2}>Ga weer verder met jouw cultuurwandelingen</Text>
      </View>
      <View style={[LogincreenCss.container4, { flex:0.03,justifyContent: 'flex-start',left:'5%'}]} >
      <Text style={LogincreenCss.texts5}>Jouw email:</Text>
        </View>
      <View style={[LogincreenCss.container4]} >
        <TextInput style={LogincreenCss.input} placeholder="E-mailadres" keyboardType="email-address" onChangeText={text => [checkFields(text),setEmail(text)]}/>
        </View>
        <View style={[LogincreenCss.container4, { flex:0.03,justifyContent: 'flex-start',left:'5%'}]} >
      <Text style={LogincreenCss.texts5}>Jouw wachtwoord:</Text>
        </View>
        <View style={[LogincreenCss.container4]} >
        <TextInput style={LogincreenCss.input} placeholder="Wachtwoord" keyboardType="email-address" onChangeText={text => [setPassword(text)]}/>
        </View>
        <View style={LogincreenCss.container8}>
        <Pressable style={LogincreenCss.button} onPress={handleLogin}>
        <LinearGradient
          colors={['#94A97F', '#758C5E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[StyleSheet.absoluteFill,{color:'#fff'}]}
        ></LinearGradient>
        <Text style={LogincreenCss.texts6}>Inloggen</Text>
        </Pressable>
      </View>
      <View style={LogincreenCss.container11}></View>
      </KeyboardAwareScrollView>
  );
};

export default Logincreen;