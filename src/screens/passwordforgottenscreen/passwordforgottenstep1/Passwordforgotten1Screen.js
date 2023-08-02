import { Text, View, Pressable,StyleSheet,TextInput} from "react-native";
import { useState,useContext  } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Passwordforgotten1ScreenCss from './Passwordforgotten1ScreenCss';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import jwtDecode from 'jwt-decode'; 
import AppContext from "../../../../assets/MyContext";

const Passwordforgotten1Screen = ({navigation}) => {
  const [fieldsAreOk, setFieldsAreOk] = useState(false);
  const { tokenValue, setTokenValue } = useContext(AppContext);
  const { userValue, setUserValue } = useContext(AppContext);
  const { pointsValue, setPointsValue } = useContext(AppContext);
  const checkFields = (text) =>{
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === true){
      setFieldsAreOk(true);
    }
    else{
        
    }
    
  }
  const [email, setEmail] = useState('');

  async function handleNextScreen(){
    try {
      const response = await fetch('https://cultgo.azurewebsites.net/users/passwordreset1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email
        }),
      });
  
      if (!response.ok) {
        // Handle signup error
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      navigation.navigate('Passwordforgotten2', { email: email });
      // User signed up successfully
      
  
    } catch (error) {
      console.log('Signup error:', error.message);
      // Handle error (display error message, show a notification, etc.)
    }
    
  };


  return (
    <KeyboardAwareScrollView style={Passwordforgotten1ScreenCss.container}
    resetScrollToCoords={{ x: 0, y: 0 }}
    contentContainerStyle={Passwordforgotten1ScreenCss.contentContainer}>
      <View style={Passwordforgotten1ScreenCss.container11}></View>
    <LinearGradient
          colors={['#D9EEED', '#F5F5F5']}
          start={{ x: 0, y: 1.5 }}
          end={{ x: 0, y: 0 }}
          style={[StyleSheet.absoluteFill,{color:'#fff'}]}
        ></LinearGradient>
    
    <View style={Passwordforgotten1ScreenCss.container8}></View>
      <View style={Passwordforgotten1ScreenCss.container10}>
        <Text style={Passwordforgotten1ScreenCss.texts4}>Wachtwoord veranderen</Text>
      </View>
      
      <View style={Passwordforgotten1ScreenCss.container10}>
        <Text style={Passwordforgotten1ScreenCss.texts2}>Vul hier je email adres in.</Text>
      </View>
      
      <View style={[Passwordforgotten1ScreenCss.container4]} >
        <TextInput style={Passwordforgotten1ScreenCss.input} placeholder="E-mailadres" keyboardType="email-address" onChangeText={text => [setEmail(text)]}/>
        </View>
        <View style={[Passwordforgotten1ScreenCss.container4, { flex:0.03,justifyContent: 'flex-start',left:'5%'}]} >
      
        </View>
        <View style={Passwordforgotten1ScreenCss.container6}>
        <Pressable style={Passwordforgotten1ScreenCss.button} onPress={handleNextScreen}>
        <LinearGradient
          colors={['#94A97F', '#758C5E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[StyleSheet.absoluteFill,{color:'#fff'}]}
        ></LinearGradient>
        <Text style={Passwordforgotten1ScreenCss.texts6}>Verder</Text>
        </Pressable></View>
        <View style={Passwordforgotten1ScreenCss.container6}>
      </View>
      
      </KeyboardAwareScrollView>
  );
};

export default Passwordforgotten1Screen;