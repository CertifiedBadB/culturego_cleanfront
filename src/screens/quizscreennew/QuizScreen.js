import React, { useEffect, useState, useContext } from 'react';
import { Text, View, Image, Pressable, StyleSheet, Dimensions } from 'react-native';
import QuizScreenCss from './QuizScreenCss';
import LoadingScreen from '../loadingscreen/LoadingScreen';
import Timer from './Timer';
import { LinearGradient } from 'expo-linear-gradient';
import ProfileScreen from '../profilescreen/ProfileScreen';
const windowWidth = Dimensions.get('window').width;
import AppContext from "../../../assets/MyContext";

const QuizScreen = ({ route, navigation }) => {
  const [allQuestions, setQuestions] = useState([]);

  const { pointsValue, setPointsValue } = useContext(AppContext);
  const { tokenValue, setTokenValue } = useContext(AppContext);
  const { userValue, setUserValue } = useContext(AppContext);

  const { questions } = route.params;
  const { token } = route.params;
  const { value } = route.params;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentObject = allQuestions[currentIndex];
  const [random1, setRandom1] = useState(null);
  const [random2, setRandom2] = useState(null);
  const [random3, setRandom3] = useState(null);
  const [collectedCoins, setCollectedCoins] = useState(0);
  const [answer, setAnswer] = useState('');
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const [goodOrBad, setGoodOrBad] = useState(false);

  // Counter for tracking the current question number
  const [questionCounter, setQuestionCounter] = useState(1);

  useEffect(() => {
    //console.log(questions);
    const updatedQuestions = questions.map((item) => {
      return {
        question: item.question,
        wronganswer1: item.wronganswer1,
        wronganswer2: item.wronganswer2,
        rightAnswer: item.rightAnswer,
        imageUrl: item.imageUrl,
        selected: false,
        isCorrect: false,
      };
    });
    setQuestions(updatedQuestions);
  }, [questions]);

  useEffect(() => {
    if (currentObject) {
      setRandom();
    }
  }, [currentObject]);

  async function sendCoinsAndNavigate(){
    console.log('hier');
    const total = collectedCoins + 10;
    try {
      console.log('hier2');
      const response = await fetch('https://cultgo.azurewebsites.net/users/updatepoints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
            Authorization: `Token ${tokenValue}`,
        },
        body: JSON.stringify({
          id: userValue,
          points: total,
        }),
      });
      console.log(route.params);
      if (response.ok) {
        setPointsValue(pointsValue+total)
          navigation.navigate('Profile', { value: userValue , tokenValue , points: pointsValue })
      } else {
        // Login failed, handle the error
       // console.log('Login failed');
      }
    } catch (error) {
      // Error occurred during login
      //console.log('Error:', error);
    }
  };

  async function checkAnswer(selectedAnswer) {
    //console.log('b' + selectedAnswer);
    //console.log('a' + currentObject.rightAnswer);
    if (selectedAnswer == currentObject.rightAnswer) {
      console.log('hi');
      setGoodOrBad(1);
      setCollectedCoins(collectedCoins + 1);
      setShowLoadingScreen(true); // Show the correct loading screen
    } else if (selectedAnswer === null) {
      setGoodOrBad(3);
      setShowLoadingScreen(true);
    } else {
      setGoodOrBad(2);
      // Handle incorrect answer behavior if needed
      setShowLoadingScreen(true); // Show the wrong loading screen
    }

    // Stel na 2 seconden showLoadingScreen in op false
    setTimeout(() => {
      setShowLoadingScreen(false);
    }, 2000);
  }

  async function goToNextObject(selectedAnswer) {
    await setAnswer(selectedAnswer); // Wait for state update to complete
    checkAnswer(selectedAnswer); // Pass the selectedAnswer as an argument

    const nextIndex = currentIndex + 1;
    if (nextIndex <= allQuestions.length) {
      if (allQuestions[nextIndex]) {
        setRandom();
      }
      setCurrentIndex(nextIndex); // Move this line after setRandom()
      setQuestionCounter(questionCounter + 1); // Increment the question counter
    } else if(!currentObject){
      // If all questions have been asked, navigate back to the Profile screen
      navigation.navigate('Profile');
    }
  }

  const setRandom = () => {
    const randomNumber = Math.floor(Math.random() * 3);
    if (currentObject) {
      let answers = [currentObject.rightAnswer, currentObject.wronganswer1, currentObject.wronganswer2];
      shuffleArray(answers); // Helper function to shuffle the answers
      setRandom1(answers[0]);
      setRandom2(answers[1]);
      setRandom3(answers[2]);
    }
  };

  // Helper function to shuffle the array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  return (
    <>
      {showLoadingScreen ? (
        <LoadingScreen route={goodOrBad} />
      ) : (
        <>
          {currentObject ? (
            <>
              <View style={QuizScreenCss.container40}>
                <Text style={QuizScreenCss.timer}>
                  <Timer initialTime={30000} onTimeUp={() => goToNextObject(null)} />
                </Text>
              </View>
              <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
                <View style={QuizScreenCss.container10}>
                  {allQuestions[currentIndex] && (
                    <Image style={styles.backgroundImage4} source={{ uri: allQuestions[currentIndex].imageUrl }} />
                  )}
                </View>
                <View style={QuizScreenCss.container8}></View>

                <View style={[QuizScreenCss.container10, { justifyContent: 'center', alignItems: 'center' }]}>
                  {allQuestions[currentIndex] && (
                    <Text style={QuizScreenCss.texts2}>{allQuestions[currentIndex].question}</Text>
                  )}
                </View>
                    
                <View style={QuizScreenCss.container18}>
                  <Pressable style={QuizScreenCss.button2} onPress={() => goToNextObject(random1)}>
                    <Text style={QuizScreenCss.texts3}>{random1}</Text>
                  </Pressable>
                  <Pressable style={QuizScreenCss.button2} onPress={() => goToNextObject(random2)}>
                    <Text style={QuizScreenCss.texts3}>{random2}</Text>
                  </Pressable>
                  <Pressable style={QuizScreenCss.button2} onPress={() => goToNextObject(random3)}>
                    <Text style={QuizScreenCss.texts3}>{random3}</Text>
                  </Pressable>
                </View>

                <View style={QuizScreenCss.container8}></View>

                <View style={QuizScreenCss.container8}></View>
                <View style={QuizScreenCss.container9}>
                  {/* Display the current question number */}
                  <Text>{`Question ${questionCounter}/${allQuestions.length}`}</Text>
                </View>
              </View>
            </>
          ) : (
            <>
            <View style={QuizScreenCss.container8 }></View>
    <View style={QuizScreenCss.container10}></View>
    
    <View style={QuizScreenCss.container10}>
  {collectedCoins <= 5 ? (
    <Image style={QuizScreenCss.headerImagestyle} source={require("../../../assets/1star.png")} />
  ) : collectedCoins <= 7 ? (
    <Image style={QuizScreenCss.headerImagestyle} source={require("../../../assets/2stars.png")} />
  ) : (
    <Image style={QuizScreenCss.headerImagestyle} source={require("../../../assets/3stars.png")} />
  )}
</View>
      <View style={QuizScreenCss.container10}>
        <Text style={QuizScreenCss.texts2}>U heeft {collectedCoins} vragen goed beantwoord! </Text>
      </View>
      <View style={QuizScreenCss.container8}>
        <Pressable style={QuizScreenCss.button} onPress={() => sendCoinsAndNavigate()}>
        <LinearGradient
          colors={['#94A97F', '#758C5E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[StyleSheet.absoluteFill,{color:'#fff'}]}
        ></LinearGradient>
        <Text style={QuizScreenCss.texts4}>Terug naar profiel</Text>
        
        </Pressable>
      </View>
      <View style={QuizScreenCss.container8}>
        
      </View>
      <View keyboardVerticalOffset style={QuizScreenCss.container15}>
        <Text style={[QuizScreenCss.texts3, { color: "#336C70" }]}></Text>
      </View>
      <View style={QuizScreenCss.container9}></View>
    </>
       
          )}
        </>
      )}
    </>
  );
};


const styles = StyleSheet.create({
  backgroundImage: {
    width: 50,
    height: 50,
    resizeMode: "contain"
  },
  backgroundImage4: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: "#4f1329",
  },
  blueBox: {
    width: 120,
    height: 70,
    backgroundColor: '#85C3C3',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
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

export default QuizScreen;