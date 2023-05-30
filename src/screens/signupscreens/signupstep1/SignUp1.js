import { Text, View, Pressable,StyleSheet,TextInput} from "react-native";
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import SignUp1Css from './SignUp1Css';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import jwtDecode from 'jwt-decode'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'

const SignUp1Screen = ({navigation}) => {
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


  
  return (
    <KeyboardAwareScrollView style={SignUp1Css.container}
    resetScrollToCoords={{ x: 0, y: 0 }}
    contentContainerStyle={SignUp1Css.contentContainer}>
      <View style={SignUp1Css.container11}></View>
    <LinearGradient
          colors={['#D9EEED', '#F5F5F5']}
          start={{ x: 0, y: 1.5 }}
          end={{ x: 0, y: 0 }}
          style={[StyleSheet.absoluteFill,{color:'#fff'}]}
        ></LinearGradient>
    
    <View style={SignUp1Css.container8}></View>
      <View style={SignUp1Css.container10}>
        <Text style={SignUp1Css.texts4}>Registreren</Text>
      </View>
      
      <View style={SignUp1Css.container10}>
        <Text style={SignUp1Css.texts2}>Een nieuw Culture Gò-account aanmaken</Text>
      </View>
      <View style={[SignUp1Css.container4, { flex:0.03,justifyContent: 'flex-start',left:'5%'}]} >
      <Text style={SignUp1Css.texts5}>Jouw email:</Text>
        </View>
      <View style={[SignUp1Css.container4]} >
        <TextInput style={SignUp1Css.input} placeholder="E-mailadres" keyboardType="email-address" onChangeText={text => [checkFields(text),setEmail(text)]}/>
        </View>
        <View style={[SignUp1Css.container4, { flex:0.03,justifyContent: 'flex-start',left:'5%'}]} >
          
        
        </View>
        <View style={[SignUp1Css.container4]} >
        </View>
        <View style={SignUp1Css.container8}>
        <Pressable style={SignUp1Css.button} onPress={() => [fieldsAreOk == true ? navigation.navigate("SignUp2",{email: email}) : alert("Dit is geen geldig email adres" + email)]}>
        <Text style={SignUp1Css.texts6}>Ga verder  <FontAwesomeIcon style={[SignUp1Css.texts6,{height:800}]} icon={ faArrowRight } />  </Text> 
        </Pressable>
      </View>
      <View style={SignUp1Css.container11}></View>
      </KeyboardAwareScrollView>
  );
};

export default SignUp1Screen;