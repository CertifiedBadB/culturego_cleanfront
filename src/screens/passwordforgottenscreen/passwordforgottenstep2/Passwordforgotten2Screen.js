import { Text, View, Pressable,StyleSheet,TextInput} from "react-native";
import { useState,useContext  } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Passwordforgotten2ScreenCss from './Passwordforgotten2ScreenCss';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import jwtDecode from 'jwt-decode'; 
import AppContext from "../../../../assets/MyContext";

const Passwordforgotten2Screen = ({navigation,route}) => {
  const [fieldsAreOk, setFieldsAreOk] = useState(false);
  const { tokenValue, setTokenValue } = useContext(AppContext);
  const { userValue, setUserValue } = useContext(AppContext);
  const { pointsValue, setPointsValue } = useContext(AppContext);
  const email = route.params?.email || null;
  const checkFields = (text) =>{
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === true){
      setFieldsAreOk(true);
    }
    else{
        
    }
    
  }
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  async function handlePasswordReset(){
    try {
      const response = await fetch('https://cultgo.azurewebsites.net/users/passwordreset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          token:code,
          newPassword:password
        }),
      });
  
      if (!response.ok) {
        // Handle signup error
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      navigation.navigate('Startup');
      // User signed up successfully
      
  
    } catch (error) {
      console.log('Signup error:', error.message);
      // Handle error (display error message, show a notification, etc.)
    }
    
  };


  
  return (
    <KeyboardAwareScrollView style={Passwordforgotten2ScreenCss.container}
    resetScrollToCoords={{ x: 0, y: 0 }}
    contentContainerStyle={Passwordforgotten2ScreenCss.contentContainer}>
      <View style={Passwordforgotten2ScreenCss.container11}></View>
    <LinearGradient
          colors={['#D9EEED', '#F5F5F5']}
          start={{ x: 0, y: 1.5 }}
          end={{ x: 0, y: 0 }}
          style={[StyleSheet.absoluteFill,{color:'#fff'}]}
        ></LinearGradient>
    
    <View style={Passwordforgotten2ScreenCss.container8}></View>
      <View style={Passwordforgotten2ScreenCss.container10}>
        <Text style={Passwordforgotten2ScreenCss.texts4}>Wachtwoord veranderen</Text>
      </View>
      
      <View style={Passwordforgotten2ScreenCss.container10}>
        <Text style={Passwordforgotten2ScreenCss.texts2}>Vul hier de code in die je op {email} hebt ontvangen</Text>
      </View>
      
      <View style={[Passwordforgotten2ScreenCss.container4]} >
        <TextInput style={Passwordforgotten2ScreenCss.input} placeholder="Ontvangen code" keyboardType="default" onChangeText={text => [setCode(text)]}/>
        </View>
        
        <View style={[Passwordforgotten2ScreenCss.container4]} >
        <TextInput style={Passwordforgotten2ScreenCss.input} placeholder="Nieuw Wachtwoord" keyboardType="default" secureTextEntry={true} onChangeText={text => [setPassword(text)]}/>
        </View>
        <View style={[Passwordforgotten2ScreenCss.container4, { flex:0.03,justifyContent: 'flex-start',left:'5%'}]} >
      
        </View>
        <View style={Passwordforgotten2ScreenCss.container6}>
        <Pressable style={Passwordforgotten2ScreenCss.button} onPress={handlePasswordReset}>
        <LinearGradient
          colors={['#94A97F', '#758C5E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[StyleSheet.absoluteFill,{color:'#fff'}]}
        ></LinearGradient>
        <Text style={Passwordforgotten2ScreenCss.texts6}>Verander</Text>
        </Pressable></View>
        
      
      </KeyboardAwareScrollView>
  );
};

export default Passwordforgotten2Screen;