import React from "react";
import { Animated } from "react-native";
import { LEAF_COLORS } from "../constants/colors";

/**
 * Falling leaf component
 * @param {Object} props - Component props
 * @param {Object} props.style - Style properties
 * @param {Animated.Value} props.animatedValue - Animation value
 * @returns {React.Component} Leaf component
 */
const Leaf = ({ style, animatedValue }) => {
  const leafSize = Math.random() * 15 + 15;
  const rotateInterpolate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <Animated.View
      style={[
        {
          width: leafSize,
          height: leafSize * 1.3,
          backgroundColor: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
          borderRadius: leafSize / 2, 
          position: "absolute",
          transform: [
            { rotate: rotateInterpolate },
            { scale: animatedValue.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 1.2, 1] }) }
          ]
        },
        style 
      ]}
    />
  );
};

export default Leaf;