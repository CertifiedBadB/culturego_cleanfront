import { useEffect, useState } from 'react';
import { Text, View, Image, Pressable, StyleSheet, Dimensions} from 'react-native';
import QuizScreenCss from './QuizScreenCss';
const windowWidth = Dimensions.get('window').width;

const QuizScreen = ({ route, navigation }) => {
  const [allQuestions, setQuestions] = useState([]);
  const { questions } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentObject = allQuestions[currentIndex];
  const [random1, setRandom1] = useState(null);
  const [random2, setRandom2] = useState(null);
  const [random3, setRandom3] = useState(null);
  const [collectedCoins, setCollectedCoins] = useState(0);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
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

  function goToNextObject(selectedAnswer) {
    setAnswer(selectedAnswer);
    checkAnswer();
    const nextIndex = currentIndex + 1;
    if (nextIndex < allQuestions.length) {
      setCurrentIndex(nextIndex);
      if (allQuestions[nextIndex]) {
        setRandom();
      }
    }
  }

  function checkAnswer() {
    if (answer === currentObject.rightAnswer) {
      setCollectedCoins(collectedCoins + 1);
      //show loading screen
    } else {
      // Handle incorrect answer behavior if needed
    }
  }

  const setRandom = () => {
    const randomNumber = Math.floor(Math.random() * 3);
    if (currentObject) {
      if (randomNumber === 0) {
        setRandom1(currentObject.rightAnswer);
        setRandom2(currentObject.wronganswer1);
        setRandom3(currentObject.wronganswer2);
      } else if (randomNumber === 1) {
        setRandom1(currentObject.wronganswer1);
        setRandom2(currentObject.rightAnswer);
        setRandom3(currentObject.wronganswer2);
      } else {
        setRandom1(currentObject.wronganswer1);
        setRandom2(currentObject.wronganswer2);
        setRandom3(currentObject.rightAnswer);
      }
    }
  };

  return (
    <> 
    {currentObject ? (
        <>
      <View style={QuizScreenCss.container40}></View>
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
        <View style={QuizScreenCss.container9}></View>
      </View> 
      </>
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
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