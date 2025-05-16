import { Animated, Easing } from "react-native";
import { height, width } from "../constants/dimensions";

/**
 * Creates a slow grow/shrink animation for the title
 * @param {Animated.Value} animationValue - Reference to the animation value
 * @returns {void}
 */
export const startTitleAnimation = (animationValue) => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true
      }),
      Animated.timing(animationValue, {
        toValue: 0,
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true
      })
    ])
  ).start();
};

/**
 * Elastic animation for buttons moving upwards
 * @param {Animated.Value} animationValue - Reference to the animation value
 * @returns {void}
 */
export const startButtonAnimation = (animationValue) => {
  Animated.timing(animationValue, {
    toValue: 1,
    duration: 800,
    easing: Easing.elastic(1),
    useNativeDriver: true,
    delay: 300
  }).start();
};

/**
 * Creates leaf objects for falling leaf animations
 * @param {number} count - The number of leaves to create
 * @returns {Array} Array of leaf objects
 */
export const createLeaves = (count) => {
  const leaves = [];

  for (let i = 0; i < count; i++) {
    const startX = Math.random() * width;
    const endX = startX + (Math.random() * 200 - 100);
    const startY = -50;
    const duration = Math.random() * 6000 + 5000;
    const delay = Math.random() * 5000;
    const animValue = new Animated.Value(0);

    leaves.push({
      id: i,
      startX,
      endX,
      startY,
      duration,
      delay,
      animValue
    });

    startLeafAnimation(animValue, duration, delay);
  }

  return leaves;
};

/**
 * Starts a falling animation for a single leaf
 * @param {Animated.Value} animValue - The leaf's animation value
 * @param {number} duration - Animation duration
 * @param {number} delay - Starting delay
 * @returns {void}
 */
export const startLeafAnimation = (animValue, duration, delay) => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(animValue, {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
        delay: delay
      }),
      Animated.timing(animValue, {
        toValue: 0,
        duration: 0, // Reset position instantly after falling
        useNativeDriver: true
      })
    ])
  ).start();
};