import { StyleSheet, Text, View,Image,Pressable,TouchableOpacity   } from "react-native";
import { useState,useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import SignUp3Css from './SignUp3Css';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const SignUp3Screen = ({navigation}) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [fieldsAreOk, setFieldsAreOk] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [fileUri2,setFileUri2] = useState(null)

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied!');
      }
    })();
  }, []);

  const addImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedAsset = result.assets[0];
      const fileUri = FileSystem.documentDirectory + 'profilepic.jpg';

      await FileSystem.moveAsync({
        from: selectedAsset.uri,
        to: fileUri,
      });
      setFileUri2(fileUri)
      console.log('Image saved:', fileUri);
    }
  };


  
  return (
    <KeyboardAwareScrollView style={SignUp3Css.container}
    resetScrollToCoords={{ x: 0, y: 0 }}
    contentContainerStyle={SignUp3Css.contentContainer}>
      <View style={SignUp3Css.container11}></View>
    <LinearGradient
          colors={['#D9EEED', '#F5F5F5']}
          start={{ x: 0, y: 1.5 }}
          end={{ x: 0, y: 0 }}
          style={[StyleSheet.absoluteFill,{color:'#fff'}]}
        ></LinearGradient>
    
    <View style={SignUp3Css.container8}></View>
      <View style={SignUp3Css.container10}>
        <Text style={SignUp3Css.texts4}>Registreren</Text>
      </View>
      
      <View style={SignUp3Css.container10}>
        <Text style={SignUp3Css.texts2}>Een nieuw Culture Gò-account aanmaken</Text>
      </View>
      <View style={[SignUp3Css.container8, { flex:0.03,justifyContent: 'center'}]} >
      <View style={SignUp3Css.containerCircle}>
                {
                    fileUri2  && <Image source={{ uri: fileUri2 }} style={{ width: 200, height: 200 }} />
                }
                    <View style={[SignUp3Css.uploadBtnContainer,{backgroundColor:"#CEE9ED"}]} >
                        <TouchableOpacity onPress={addImage} style={[SignUp3Css.uploadBtn,{top:'35%'}]} >
                        <FontAwesomeIcon style={[SignUp3Css.texts6,{height:800}]} icon={ faCamera } />
                        </TouchableOpacity>
                    </View>
            </View>
        </View>
        <View style={[SignUp3Css.container4, { flex:0.03,justifyContent: 'flex-start',left:'5%'}]} >
          
        
        </View>
        <View style={[SignUp3Css.container4]} >
        </View>
        <View style={SignUp3Css.container8}>
        <Pressable style={SignUp3Css.button} onPress={() => navigation.navigate("Login")}>
        <LinearGradient
          colors={['#94A97F', '#758C5E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[StyleSheet.absoluteFill,{color:'#fff'}]}
        ></LinearGradient>
        <Text style={SignUp3Css.texts6}>Afronden  <FontAwesomeIcon style={[SignUp3Css.texts6,{height:800}]} icon={ faArrowRight } />  </Text> 
        </Pressable>
      </View>
      <View style={SignUp3Css.container11}></View>
      </KeyboardAwareScrollView>
  );
};

export default SignUp3Screen;