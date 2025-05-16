import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { COLORS } from "../MenuPage/constants/colors";
import { styles as menuStyles } from "../MenuPage/styles/MenuStyle";
import { startButtonAnimation, startTitleAnimation } from "../MenuPage/utils/animations";

const ResultPage = ({ onClose }) => {
  const titleAnimation = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(0)).current;

  const titleScale = titleAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.08, 1]
  });

  useEffect(() => {
    startTitleAnimation(titleAnimation);
    startButtonAnimation(buttonAnimation);
  }, [titleAnimation, buttonAnimation]);

  return (
    <View style={localStyles.container}>
      <Animated.Text
        style={[
          menuStyles.title,
          {
            transform: [{ scale: titleScale }],
            textShadowColor: 'rgba(215, 57, 1, 0.5)',
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 10,
            marginBottom: 40,
            fontSize: 36,
          }
        ]}
      >
        Scores
      </Animated.Text>

      <Animated.View style={{
        opacity: buttonAnimation,
        transform: [{ translateY: buttonAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0]
        })}]
      }}>
        <Button
          mode="contained"
          onPress={onClose}
          style={menuStyles.button}
          buttonColor={COLORS.primary}
          labelStyle={menuStyles.buttonText}
        >
          Back to Menu
        </Button>
      </Animated.View>
    </View>
  )
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default ResultPage;