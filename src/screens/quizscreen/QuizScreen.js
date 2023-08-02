import { useEffect, useState } from 'react';
import { Text, View, Image, Pressable, StyleSheet, Dimensions, FlatList } from 'react-native';
import QuizScreenCss from './QuizScreenCss';

const windowWidth = Dimensions.get('window').width;

const QuizScreen = ({ route, navigation }) => {
  const collectedCoins = 0; // User's collected coins count
  const [allQuestions, setQuestions] = useState([]);
  const { questions } = route.params.questions;
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentObject = allQuestions[currentIndex];
  const { pointsValue, setPointsValue } = useContext(AppContext);
  const { tokenValue, setTokenValue } = useContext(AppContext);
  const { userValue, setUserValue } = useContext(AppContext);
  useEffect(() => {
    const updatedQuestions = questions.map((item) => {
      return {
        question: item.question,
        wronganswer1: item.wronganswer1,
        wronganswer2: item.wronganswer2,
        rightAnswer: item.rightAnswer,
        imageUrl: item.imageUrl,
        selected: false, // Check if this is initially set to false
        isCorrect: false,
      };
    });
    setQuestions(updatedQuestions);
  }, [questions]);

  const goToNextObject = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < allQuestions.length) {
      setCurrentIndex(nextIndex);
    }
  };

  const renderRoute = ({ item }) => {
    const answers = [item.wronganswer1, item.wronganswer2, item.rightAnswer];
    const shuffledAnswers = answers.sort(() => Math.random() - 0.5);

    const handleAnswerSelection = (selectedAnswer) => {
      // Check if the selected answer is correct
      const isCorrect = selectedAnswer === item.rightAnswer;

      // Update the item's selected property and navigate to the next question
      setQuestions((prevQuestions) => {
        const updatedQuestions = prevQuestions.map((q, index) => {
          if (index === currentIndex) {
            return {
              ...q,
              selected: true,
              isCorrect: isCorrect,
            };
          }
          return q;
        });
        return updatedQuestions;
      });

      setTimeout(goToNextObject, 1000); // Delay the navigation by 1 second
    };

    return (
      <View style={QuizScreenCss.container5}>
        {shuffledAnswers.map((answer, index) => (
          <Pressable
            key={index}
            style={[
              QuizScreenCss.button,
              item.selected && item.isCorrect && { backgroundColor: 'green' },
              item.selected && !item.isCorrect && { backgroundColor: 'red' },
              !item.selected && { backgroundColor: 'white', elevation: 5 },
              { marginBottom: 10 } // Add margin to create space between buttons
            ]}
            onPress={() => handleAnswerSelection(answer)}
          >
            <Text style={[QuizScreenCss.texts5]}>{answer}</Text>
          </Pressable>
        ))}
        <Text></Text>
      </View>
    );
  };

  return (
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
          <FlatList
            data={allQuestions}
            renderItem={renderRoute}
            keyExtractor={(item) => item.question}
            numColumns={1}
          />
        </View>

        <View style={QuizScreenCss.container8}></View>

        <View style={QuizScreenCss.container8}></View>
        <View style={QuizScreenCss.container9}></View>
      </View>
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