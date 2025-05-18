import BackButton from "fall-panic/src/components/BackButton";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
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

      <BackButton buttonAnimation={buttonAnimation} onPress={onClose} />

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