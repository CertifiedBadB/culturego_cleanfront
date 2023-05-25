import { useEffect, useState } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

const LoadingScreen = () => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Animated.Image
          style={[styles.image, { transform: [{ scale }] }]}
          source={require('../../../assets/smallLogo.png')}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  imageContainer: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '50%',
    height: '50%',
  },
});

export default LoadingScreen;