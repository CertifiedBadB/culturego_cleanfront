import { Text, View, Pressable,StyleSheet,TextInput} from "react-native";
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import SignUp2Css from './SignUp2Css';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'

const SignUp2Screen = ({ route, navigation }) => {
  const [fieldsAreOk, setFieldsAreOk] = useState(false);
  const checkFields = (text) => {
    // Controleer op minimaal 5 tekens
    if (text.length < 5) {
      setFieldsAreOk(false);
    }
  
    // Controleer op een hoofdletter
    else if (!/[A-Z]/.test(text)) {
      setFieldsAreOk(false);
    }
  
    // Controleer op een speciaal teken
    else if (!/[\W_]/.test(text)) {
      setFieldsAreOk(false);
    }
    else{
    setFieldsAreOk(true);
    }
  };
  const { email } = route.params;
  const [password, setPassword] = useState('');

  const signUpUser = async () => {
    try {
      const response = await fetch('https://cultgo.azurewebsites.net/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      if (!response.ok) {
        // Handle signup error
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      navigation.navigate("SignUp3");
      // User signed up successfully
      
  
    } catch (error) {
      console.log('Signup error:', error.message);
      // Handle error (display error message, show a notification, etc.)
    }
  };


  
  return (
    <KeyboardAwareScrollView style={SignUp2Css.container}
    resetScrollToCoords={{ x: 0, y: 0 }}
    contentContainerStyle={SignUp2Css.contentContainer}>
      <View style={SignUp2Css.container11}></View>
    <LinearGradient
          colors={['#D9EEED', '#F5F5F5']}
          start={{ x: 0, y: 1.5 }}
          end={{ x: 0, y: 0 }}
          style={[StyleSheet.absoluteFill,{color:'#fff'}]}
        ></LinearGradient>
    
    <View style={SignUp2Css.container8}></View>
      <View style={SignUp2Css.container10}>
        <Text style={SignUp2Css.texts4}>Registreren</Text>
      </View>
      
      <View style={SignUp2Css.container10}>
        <Text style={SignUp2Css.texts2}>Een nieuw Culture Gò-account aanmaken voor {email}</Text>
        
      </View>
      <View style={[SignUp2Css.container4, { flex:0.03,justifyContent: 'flex-start',left:'5%'}]} >
      <Text style={SignUp2Css.texts5}>Jouw wachtwoord:</Text>
        </View>
      <View style={[SignUp2Css.container4]} >
        <TextInput style={SignUp2Css.input} placeholder="Wachtwoord" keyboardType="default"  secureTextEntry={true} onChangeText={text => [checkFields(text),setPassword(text)]}/>
        </View>
        <View style={[SignUp2Css.container4, { flex:0.03,justifyContent: 'flex-start',left:'5%'}]} >
        <Text style={[SignUp2Css.texts5,{alignSelf:"center",width:'80%'}]}> Minimaal 5 tekens, {'\n'} Een hoofdletter, {'\n'} Een speciaal teken. </Text>
        
        </View>
        <View style={[SignUp2Css.container4]} >
        </View>
        <View style={SignUp2Css.container8}>
        <Pressable style={SignUp2Css.button} onPress={() => [fieldsAreOk == true ? signUpUser() : alert("Dit is geen geldig wachtwoord!")]}>
        <Text style={SignUp2Css.texts6}>Ga verder  <FontAwesomeIcon style={[SignUp2Css.texts6,{height:800}]} icon={ faArrowRight } />  </Text> 
        </Pressable>
      </View>
      <View style={SignUp2Css.container11}></View>
      </KeyboardAwareScrollView>
  );
};

export default SignUp2Screen;