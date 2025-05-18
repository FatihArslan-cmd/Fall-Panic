import React from "react";
import { Animated } from "react-native";
import { Button } from "react-native-paper";
import { COLORS } from "../pages/MenuPage/constants/colors";
import { styles as menuStyles } from "../pages/MenuPage/styles/MenuStyle";

const BackButton = ({ buttonAnimation, onPress }) => {
  const animatedStyle = {
    opacity: buttonAnimation,
    transform: [{
      translateY: buttonAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0]
      })
    }]
  };

  return (
    <Animated.View style={animatedStyle}>
      <Button
        mode="contained"
        onPress={onPress}
        style={menuStyles.button}
        buttonColor={COLORS.primary}
        labelStyle={menuStyles.buttonText}
      >
        Back to Menu
      </Button>
    </Animated.View>
  );
};

export default BackButton;