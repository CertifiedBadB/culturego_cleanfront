import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

const Timer = ({ onTimeUp }) => {
  const [time, setTime] = useState(3000); // 30 seconds in milliseconds

  useEffect(() => {
    let startTime = Date.now();

    const timer = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const newTime = Math.max(0, 3000 - elapsedTime); // Prevent negative values

      setTime(newTime);

      if (newTime <= 0) {
        clearInterval(timer);
        onTimeUp();
      }
    }, 10); // Update every 10 milliseconds (adjust as needed)

    // Clear the timer when the component unmounts
    return () => clearInterval(timer);
  }, [onTimeUp]);

  const formatTime = (timeInMilliseconds) => {
    const seconds = Math.floor(timeInMilliseconds / 1000);
    const twoDigitSeconds = String(seconds).padStart(2, '0');
    const milliseconds = (timeInMilliseconds - seconds * 1000).toString().slice(0, 2);

    return `${twoDigitSeconds}:${milliseconds}`;
  };

  return <Text>{formatTime(time)}</Text>;
};

export default Timer;