import { useEffect, useState } from 'react';
import { ScrollView,Text, View, StyleSheet, Image, Modal, TouchableOpacity , Pressable } from 'react-native';
import { getPreciseDistance } from "geolib";
import { StatusBar } from "expo-status-bar";
import * as Location from 'expo-location'; // Modified import statement
import LoadingScreen from '../loadingscreen/LoadingScreen';
import AppContext from "../../../assets/MyContext";
const WalkingScreen = ({ route,navigation }) => {
  
  const[modalVisible,setModalVisible] = useState(false);
  const[modalVisible2,setModalVisible2] = useState(false);
  const criticalDistance = 25;
  //positie van de gebruiker
  const [clicked, setClicked] = useState(true);
  const [collected, setCollected] = useState(0);
  const Pulse = require("react-native-pulse").default;
  const [currentPosition, setCurrentPosition] = useState(null);
  const [backgroundsize, setSize] = useState(150);
  const [closestPosition, setClosestPosition] = useState(null);
  const [calculatedPositionArray,setCalculatedPositionArray] = useState([]);
  const [newPositionArray,setNewPositionArray] = useState();
  const[north,setNorth] = useState(null);
  const [isOrientationSet, setIsOrientationSet] = useState(false);
  const[direction,setDirection] = useState(null);
  const[varr, setVar] = useState(null);
  const [heading, setHeading] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [arrowRotation, setArrowRotation] = useState(0);
  const [bearing,setBearing] = useState(0);
  const [finishWalking, setFinishWalking] = useState(0);
  const[positionArray,setPositionArray] = useState([]);
  const[questionsArray,setQuestionsArray] = useState([]);
  const { tour } = route.params;
const [isDataFetched, setIsDataFetched] = useState(false);


const fetchAndSetData = () => {
  const UpdatedPosArray = tour.map((item) => {
    return {
      longtitude: item.location.coordinates[1],
      latitude: item.location.coordinates[0],
      distance: null,
      angle: null,
      finished: false,
      subInformation: item.description,
      title: item.name,
      imageUrl: item.photo,
    };
  });
  const questionArray = tour.map((item) => {
    return {
      question: item.question.question,
      wronganswer1: item.question.badAnswers[0],
      wronganswer2: item.question.badAnswers[1],
      rightAnswer: item.question.goodAnswer,
      imageUrl: item.photo
    };
  });
  setQuestionsArray(questionArray)
  setPositionArray(UpdatedPosArray);
  // Add a delay of 2 seconds before setting isDataFetched to true
  setTimeout(() => {
    
    setIsDataFetched(true);
  }, 2000);
};
    

    useEffect(() => {
      const observerCallback = async (position, heading) => {
        if (isDataFetched && position && position.coords) {
          console.log(positionArray);
          await setCurrentPosition(position);
          await pushClosestPosition(position);
        }
        
        if (isDataFetched && heading && heading.trueHeading) {
          await setHeading(heading.trueHeading);
        }
      };
    
      const startLocationUpdates = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
    
        const positionSubscription = await Location.watchPositionAsync({
          accuracy: Location.Accuracy.Highest,
          distanceInterval: 0.5,
        }, async (position) => {
          await observerCallback(position, null);
        });
    
        const headingSubscription = await Location.watchHeadingAsync(async (heading) => {
          await observerCallback(null, heading);
        });
    
        return () => {
          positionSubscription && positionSubscription.remove();
          headingSubscription && headingSubscription.remove();
        };
      };
    
      const fetchDataAndStartLocationUpdates = async () => {
        if(isDataFetched == false){
        await fetchAndSetData();
        }
        await startLocationUpdates();
      };
    
      fetchDataAndStartLocationUpdates();
    }, [isDataFetched]);


async function pushDistance(userPosition) {
  for (let i = 0; i < positionArray.length; i++) {
    setFinishWalking(positionArray.length);
    const d = getPreciseDistance(
      { latitude: positionArray[i].latitude, longitude: positionArray[i].longtitude },
      { latitude: userPosition.coords.latitude, longitude: userPosition.coords.longitude }
    );
    let bearing = calculateBearing({ latitude: userPosition.coords.latitude, longitude: userPosition.coords.longitude },
      { latitude: positionArray[i].latitude, longitude: positionArray[i].longtitude });
    calculatedPositionArray[i] = {...calculatedPositionArray[i], distance: d,bearing:bearing,position: positionArray[i] };
    setCalculatedPositionArray(calculatedPositionArray);
  }
  return calculatedPositionArray;
}

async function pushClosestPosition(userPosition) {
  //console.log(smallestDistance);
  let nearestObject = null;
  let smallestDistance = Infinity;
  await pushDistance(userPosition).then((calculatedPositionArray) => {
    for (let i = 0; i < calculatedPositionArray.length; i++) {
      const distance = calculatedPositionArray[i].distance;
      if (distance < smallestDistance) {
        nearestObject = calculatedPositionArray[i];
        smallestDistance = distance;
        
      }
    }  
    setClosestPosition(nearestObject);
    //console.log(closestPosition);
  });
};

function calculateBearing(startCoords, targetCoords) {
  if (!startCoords) {
    return 0;
  }
  let lat1 = startCoords.latitude;
  let lon1 = startCoords.longitude;
  let lat2 = targetCoords.latitude;
  let lon2 = targetCoords.longitude;
  let dLon = (lon2 - lon1) * (Math.PI / 180);
  lat1 = lat1 * (Math.PI / 180);
  lat2 = lat2 * (Math.PI / 180);
  let y = Math.sin(dLon) * Math.cos(lat2);
  let x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  let bearing = (Math.atan2(y, x) * 180) / Math.PI;
  return bearing;
}
  function pointCollected(){
    const arrCopy = calculatedPositionArray;
    const arrCopy2 = positionArray;
    const whatObject = arrCopy.find(obj =>{
      return obj.distance == closestPosition.distance;
    })
    if(whatObject){
    //console.log(whatObject);
    const indexOfObject1 = arrCopy.findIndex(obj => obj === whatObject);
    arrCopy.splice(indexOfObject1, 1);
    const indexOfObject2  = arrCopy2.findIndex(obj => obj === whatObject.position);
    arrCopy2.splice(indexOfObject2, 1);
    setPositionArray(arrCopy2);
		setCalculatedPositionArray(arrCopy);
    }
    else{
      
    }
  }

  function collectPoint() {
    setCurrentPosition(null);
	  setFinishWalking(finishWalking-1);
    // const arrCopy = calculatedPositionArray;
    // const arrCopy2 = positionArray;
    // const whatObject = arrCopy.find(obj =>{
    //   return obj.distance == closestPosition.distance;
    // })
    // if(whatObject){
    // console.log(whatObject);
    // const indexOfObject1 = arrCopy.findIndex(obj => obj === whatObject);
    // arrCopy.splice(indexOfObject1, 1);
    // const indexOfObject2  = arrCopy2.findIndex(obj => obj === whatObject.position);
    // arrCopy2.splice(indexOfObject2, 1);
    // setPositionArray(arrCopy2);
		// setCalculatedPositionArray(arrCopy);
    setModalVisible(true);
    setCollected(collected+1);
  }


  return (
    
<View style={styles.container}>
{isDataFetched == true ? (
  <>
  <View style={[styles.container4,{  height:2, alignSelf: 'stretch'}]}>

  </View>

      <View style={styles.container1}>
        <Image
          source={require("../../../assets/smallLogo.png")}
          style={styles.backgroundImage2}
        />
      </View>
      <View style={styles.container2}>
        {closestPosition !== null &&  closestPosition.distance <= 60
          ? <Pulse
              color="#008000"
              numPulses={1}
              diameter={400}
              speed={5}
              Duration={1000}
            />
          : null}
        {closestPosition !== null &&  closestPosition.distance > 50 && closestPosition.distance <= 150
          ? <Pulse
              color="#9ACD32"
              numPulses={1}
              diameter={400}
              speed={5}
              Duration={1000}
            />
          : null}
        {closestPosition !== null && closestPosition.distance > 100 && closestPosition.distance <= 300
          ? <Pulse
              color="#e6e600"
              numPulses={1}
              diameter={400}
              speed={5}
              Duration={1000}
            />
          : null}
        {closestPosition !== null && closestPosition.distance > 200 && closestPosition.distance <= 550
          ? <Pulse
              color="#FFAE42"
              numPulses={1}
              diameter={400}
              speed={5}
              Duration={1000}
            />
          : null}
        {closestPosition !== null && closestPosition.distance > 450 && closestPosition.distance <= 850
          ? <Pulse
              color="#FF5349"
              numPulses={1}
              diameter={400}
              speed={5}
              Duration={1000}
            />
          : null}
        {closestPosition !== null && closestPosition.distance > 750 && closestPosition.distance <= 150000
          ? <Pulse
              color="#FF0000"
              numPulses={1}
              diameter={400}
              speed={5}
              Duration={1000}
            />
          : null} 
        {closestPosition !== null &&  closestPosition.distance > criticalDistance
          ? <TouchableOpacity>
            {arrowRotation != null
              ?
              <Image
                source={require("../../../assets/arrow.png")}
                style={[
                  styles.backgroundImage,
                  {
                    transform: [{ rotate: `${360 - heading + closestPosition.bearing}deg` }],
                    width: backgroundsize,
                    height: backgroundsize,
                    borderRadius: backgroundsize / 2,
                    backgroundColor: "#F1F7F8",
                  },
                ]}
              />
              : null}
            </TouchableOpacity>
            :  
            <TouchableOpacity onPress={() => collectPoint()}>
              <Image
                source={require("../../../assets/coin.png")}
                style={[
                  styles.backgroundImage,
                  {
                    width: backgroundsize,
                    height: backgroundsize,
                    borderRadius: backgroundsize / 2,
                    backgroundColor: "#F1F7F8",
                  },
                ]}
              />
            </TouchableOpacity>}
            

        <StatusBar style="auto" hidden />
      </View>
      <View style={[styles.container4,{ color:'#4f767c', height:2, alignSelf: 'stretch'}]}>

  </View>
      <View style={[styles.container4,{ color:'#4f767c', height:2, alignSelf: 'stretch'}]}>
    <Text style={styles.text2}>
      {collected} / 10
    </Text>
  </View>
      <View style={styles.container3} />
        <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        >
        <View style={[styles.container]}>
          <View style={styles.container1}>
            <Image style={styles.backgroundImage4} source={closestPosition !== null ? {uri:closestPosition.position.imageUrl} : null}/>	
          </View>
          <View style={styles.container4}>
            
            <Text style={[styles.text2,{fontSize:25}]}>{closestPosition !== null ? closestPosition.position.title: "title"}</Text>
          </View>
          <View style={styles.container3}>
            <ScrollView>
            <Text style={styles.Text}>{closestPosition !== null ? closestPosition.position.subInformation : "info"}</Text>
            </ScrollView>
            </View>
          <View style={styles.container3}>
          {collected !== 10 ?
            <Pressable  style={styles.btnStyle} onPress={() => {setModalVisible(false) + pointCollected(), setClicked(true)}}>
              <Text style={[styles.Text,{color:"white", fontSize:18,fontWeight:'bold'}]}>Verzamelen</Text>
            </Pressable >
            :
            <Pressable  style={styles.btnStyle} onPress={() => {navigation.navigate("Quiz",{questions: questionsArray})}}>
              <Text style={[styles.Text,{color:"white", fontSize:18,fontWeight:'bold'}]}>Start de Quiz</Text>
            </Pressable >
            }
          </View>
        </View>
	  </Modal>

	  <Modal
	  animationType="slide"
	  visible={modalVisible2}
	  onRequestClose={() => setModalVisible(false)}
	  >
		<View style={[styles.container]}>
			<View style={styles.container1}>
				<Image style={styles.backgroundImage4} source={require("../../../assets/smallLogo.png")}/>	
			</View>
			<View style={styles.container4}>
				<Text style={styles.text2}>hhhh</Text>
			</View>
			<View style={styles.container3}>
				<Text style={styles.Text}>hhh</Text>
				</View>
			<View style={styles.container3}>
				<Pressable  style={styles.btnStyle} onPress={() => setModalVisible(false)}>
					<Text style={styles.Text}>Venster sluiten</Text>
				</Pressable >
			</View>
		</View>
	  </Modal>
    </>
    ) : (
      <LoadingScreen /> )}
    </View> 
  );
};


const styles = StyleSheet.create({
	btnStyle: {
		backgroundColor: '#4f767c',
		borderRadius:50,
		elevation: 3,
		paddingVertical: 12,
    paddingHorizontal: 32,
		borderColor:"#4f767c",
		borderWidth:2,
		color: "white"
	},
  text2: {
    color:'#4f767c',
    fontWeight: "bold",
	fontSize:20
  },
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: "#F1F7F8",
    alignItems: "center",
    justifyContent: "center",
  },
  container1: {
    flex: 0.3,
    width: null,
    height: null,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
	color: "white",
    fontWeight: "bold",
    flex: 0.4,
    width: null,
    height: null,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  container3: {
    flex: 0.2,
    width: null,
    height: null,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  container4: {
    flex: 0.1,
    width: null,
    height: null,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  Text: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.25,
    color:'#4f767c',
	marginLeft:30,
	marginRight:30
  },
  
  backgroundImage: {
    backgroundColor: "#4f1329",
  },
  backgroundImage4: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: "#4f1329",
  },
  backgroundImage3: {
    width: 170,
    height: 170,
    borderRadius: 170 / 2,
    backgroundColor: "#4f1329",
  },
  backgroundImage2: {
    bottom: 0,
    resizeMode: "contain",
    height: 150,
  },
});


export default WalkingScreen;