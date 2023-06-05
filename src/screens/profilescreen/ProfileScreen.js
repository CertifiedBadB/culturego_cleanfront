import { Text, View, Image, Pressable,StyleSheet,Dimensions,FlatList } from "react-native";
import { useEffect,useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import ProfileScreenCss from './ProfileScreenCss';
import * as FileSystem from 'expo-file-system';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
const leftImageSource = require('../../../assets/smallLogo.png');
const rightImageSource = { uri: FileSystem.documentDirectory + 'profilepic.jpg' };
const windowWidth = Dimensions.get('window').width;


const ProfileScreen = ({route,navigation}) => {
  const collectedCoins = 0; // User's collected coins count
  const [allRoutes, setallRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState();

  useEffect(() => {
    // Your data fetching logic and setAllRoutes() code here
  
    // Assuming allRoutes is an array of objects with properties `_id` and `name`
    const updatedRoutes = allRoutes.map((route) => {
      return {
        id: route._id,
        route: route,
        name: route.title,
        selected: false,
      };
    });
  
    setRoutes(updatedRoutes);
  }, [allRoutes]);

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
        setallRoutes(data);

      } catch (error) {
        console.error(error);
        // Handle any errors that occurred during the request
      }
    };

    fetchData();
  }, [route.params.value.token]);

  const [routes, setRoutes] = useState([]);
  
  
  const renderRoute = ({ item }) => (
    <View style={ProfileScreenCss.container5}>
      <Pressable
        key={item.id}
        style={[
          ProfileScreenCss.button,
          item.selected ? { backgroundColor: 'white', elevation: 5 } : null,
        ]}
        onPress={() => {
          console.log(JSON.stringify(item.route.points));
          setSelectedRoute(item.route.points);
          const updatedRoutes = routes.map((route) => {
            if (route.id === item.id) {
              return {
                ...route,
                selected: true,
              };
            }
            return {
              ...route,
              selected: false,
            };
          });
          console.log(selectedRoute);
          setRoutes(updatedRoutes);
        }}
      >
        <Text>
          {item.selected ? (
            <FontAwesomeIcon
              style={[ProfileScreenCss.texts3, { height: 800, color: "#5AA0A7" }]}
              icon={faCheck}
            />
          ) : null}
          <Text style={[ProfileScreenCss.texts5, { marginLeft: 30 }]}>
            {" " + item.name}
          </Text>
        </Text>
      </Pressable>
      <Text></Text>
    </View>
  );


  return (<>
  <View style={{ flex: 1,backgroundColor:'#F5F5F5' }}>

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
    <Pressable style={ProfileScreenCss.buttonStart} onPress={() => [console.log(selectedRoute), navigation.navigate("Walking",{tour: selectedRoute})]}>
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