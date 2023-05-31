import { Text, View, Image, Pressable,StyleSheet,Dimensions,FlatList } from "react-native";
import { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import ProfileScreenCss from './ProfileScreenCss';
import * as FileSystem from 'expo-file-system';

const leftImageSource = require('../../../assets/smallLogo.png');
const rightImageSource = { uri: FileSystem.documentDirectory + 'profilepic.jpg' };
const windowWidth = Dimensions.get('window').width;
const containerHeight = windowWidth * 0.15;


const ProfileScreen = ({route,navigation}) => {
  const collectedCoins = 200; // User's collected coins count
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = route.params.token;
        const url = 'https://cultgo.azurewebsites.net/paths/get';

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Request failed');
        }

        const data = await response.json();
        console.log(data[0].title);
        // Handle the data received from the API
      } catch (error) {
        console.error(error);
        // Handle any errors that occurred during the request
      }
    };

    fetchData();
  }, [route.params.value.token]);


  const routes = [
    { id: '1', name: 'Historische route' },
    { id: '2', name: 'Otherroute' },
    // Add more routes here
  ];

  const renderRoute = ({ item }) => (
    <View style={ProfileScreenCss.container5}>

        <Pressable style={ProfileScreenCss.button}>
        <Text style={ProfileScreenCss.texts5}> {item.name} </Text> 
        </Pressable>
      <Text></Text>
    </View>
  );



  return (<>
  <View style={{ flex: 1 }}>
  <LinearGradient
    colors={['#D9EEED', '#F5F5F5']}
    start={{ x: 0.5, y: 0.5 }}
    end={{ x: 1, y: 1 }} // Adjust the end position to cover the entire screen vertically (0.5, 1.0)
    style={StyleSheet.absoluteFill}
  ></LinearGradient>

  <View style={ProfileScreenCss.container10}>
    <View style={ProfileScreenCss.leftImageContainer}>
      <Image source={leftImageSource} style={ProfileScreenCss.leftImage} resizeMode="contain" />
    </View>
    <View style={ProfileScreenCss.rightImageContainer}>
      <View style={ProfileScreenCss.circle}>
        <Image source={rightImageSource} style={ProfileScreenCss.rightImage} resizeMode="contain" />
      </View>
    </View>
  </View>

  <View style={ProfileScreenCss.container40}>
    <View style={styles.blueBox}>
      <Image source={require('../../../assets/coin.png')} style={styles.coinImage} />
      <Text style={styles.coinText}>{collectedCoins}</Text>
    </View>
  </View>

  <View style={[ProfileScreenCss.container10, { justifyContent: 'center', alignItems: 'center' }]}>
    <Text style={ProfileScreenCss.texts2}>Maak een keuze</Text>
  </View>

  <View style={ProfileScreenCss.container18}>
    <FlatList
      data={routes}
      renderItem={renderRoute}
      keyExtractor={(item) => item.id}
      numColumns={1} // Adjust the number of columns as needed
    />
  </View>

  <View style={ProfileScreenCss.container8}>
    <Pressable style={ProfileScreenCss.buttonStart} onPress={() => navigation.navigate("Login", { email: "jordyhu@live.nl" })}>
      <LinearGradient
        colors={['#94A97F', '#758C5E']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[StyleSheet.absoluteFill, { color: '#fff' }]}
      ></LinearGradient>
      <Text style={ProfileScreenCss.texts4}>Route starten</Text>
    </Pressable>
  </View>

  <View style={ProfileScreenCss.container8}></View>
  <View style={ProfileScreenCss.container9}></View>
</View>
</>  
  );
};

const styles = StyleSheet.create({
  blueBox: {
    width: 120,
    height: 70,
    backgroundColor: '#85C3C3',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  coinImage: {
    position: 'absolute',
    top: '-30%',
    width: '90%',
    height: '60%',
    resizeMode: 'contain',
  },
  coinText: {
    fontSize: 17,
    color: 'white',
    zIndex: 1,
  },
});

export default ProfileScreen;