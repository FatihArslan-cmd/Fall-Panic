import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

const { width: screenWidth } = Dimensions.get('window');

const CIRCLE_SIZE = 60;
const BOTTOM_MARGIN = 30;
const MOVEMENT_SPEED = 24;

const GamePage = () => {
  const [circlePositionX, setCirclePositionX] = useState((screenWidth - CIRCLE_SIZE) / 2);
  const [isMovingLeft, setIsMovingLeft] = useState(false);
  const [isMovingRight, setIsMovingRight] = useState(false);
  const animationFrameId = useRef(null);

  const handleTouchStart = (event) => {
    const touchX = event.nativeEvent.locationX;
    const circleCenterX = circlePositionX + CIRCLE_SIZE / 2;

    if (touchX > circleCenterX) {
      setIsMovingRight(true);
      setIsMovingLeft(false);
    } else if (touchX < circleCenterX) {
      setIsMovingLeft(true);
      setIsMovingRight(false);
    }
  };

  const handleTouchEnd = () => {
    setIsMovingLeft(false);
    setIsMovingRight(false);
  };

  useEffect(() => {
    const animate = () => {
      setCirclePositionX(prevPositionX => {
        let newPositionX = prevPositionX;

        if (isMovingLeft) {
          newPositionX = prevPositionX - MOVEMENT_SPEED;
        } else if (isMovingRight) {
          newPositionX = prevPositionX + MOVEMENT_SPEED;
        }

        newPositionX = Math.max(0, newPositionX);
        newPositionX = Math.min(screenWidth - CIRCLE_SIZE, newPositionX);

        return newPositionX;
      });

      if (isMovingLeft || isMovingRight) {
        animationFrameId.current = requestAnimationFrame(animate);
      }
    };

    if (isMovingLeft || isMovingRight) {
      animationFrameId.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };

  }, [isMovingLeft, isMovingRight]);

  return (
    <TouchableWithoutFeedback onPressIn={handleTouchStart} onPressOut={handleTouchEnd}>
      <View style={styles.container}>
        <View
          style={[
            styles.circle,
            {
              left: circlePositionX,
              bottom: BOTTOM_MARGIN,
            },
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  circle: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: 'dodgerblue',
  },
});

export default GamePage;