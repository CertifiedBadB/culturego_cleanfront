import { Text, View, Image, Pressable,StyleSheet} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import StartScreenCss from './StartScreenCss';

const StartScreen = ({navigation}) => {
  return (
    <>
    <View style={StartScreenCss.container10}></View>
    
      <View style={StartScreenCss.container40}>
        <Image style={StartScreenCss.headerImagestyle} source={require("../../../assets/smallLogo.png")} />
      </View>
      <View style={StartScreenCss.container10}>
        <Text style={StartScreenCss.texts2}>Ga aan de slag met wandelen. Ontdek leuke culturele plekken bij jou in de buurt</Text>
      </View>
      <View style={StartScreenCss.container8}>
        <Pressable style={StartScreenCss.button} onPress={() => navigation.navigate("Login", { email: "jordyhu@live.nl" })}>
        <LinearGradient
          colors={['#94A97F', '#758C5E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[StyleSheet.absoluteFill,{color:'#fff'}]}
        ></LinearGradient>
        <Text style={StartScreenCss.texts4}>Inloggen</Text>
        
        </Pressable>
      </View>
      <View style={StartScreenCss.container8}>
        <Pressable style={StartScreenCss.button2} onPress={() => navigation.navigate("SignUp email", { email: "jordyhu@live.nl" })}>
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