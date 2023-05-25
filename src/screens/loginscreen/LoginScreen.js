import { Text, View, Pressable,StyleSheet,TextInput} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import LogincreenCss from './LoginScreenCss';

const Logincreen = ({navigation}) => {

  
  return (
    <>
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
        <TextInput style={LogincreenCss.input} placeholder="Wachtwoord" keyboardType="email-address" onChangeText={text => [checkFields(text),setEmail(text)]}/>
        </View>
        <View style={LogincreenCss.container8}>
        <Pressable style={LogincreenCss.button} onPress={() => navigation.navigate("Login", { email: "jordyhu@live.nl" })}>
        <LinearGradient
          colors={['#94A97F', '#758C5E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[StyleSheet.absoluteFill,{color:'#fff'}]}
        ></LinearGradient>
        <Text style={LogincreenCss.texts6}>Inloggen</Text>
        
        </Pressable>
      </View>
      </>
  );
};

export default Logincreen;