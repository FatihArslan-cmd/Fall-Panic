import BackButton from "fall-panic/src/components/BackButton";
import FadeIn from "../../../../../src/components/Animations/FadeInAnimation";
import React, { useEffect, useRef, useState } from "react";
import ScoreList from "fall-panic/src/pages/ResultPage/components/ScoreList";
import { mockScoreData } from "fall-panic/src/pages/ResultPage/components/mockData";
import { Animated, StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { AnimatedSection } from "../../../../../src/components/Animations/EnteringPageAnimation";
import { styles as menuStyles } from "../MenuPage/styles/MenuStyle";
import { startButtonAnimation, startTitleAnimation } from "../MenuPage/utils/animations";

const ResultPage = ({ onClose }) => {
  const titleAnimation = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(0)).current;
  const [filteredScores, setFilteredScores] = useState(mockScoreData);

  const titleScale = titleAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.08, 1]
  });

  useEffect(() => {
    startTitleAnimation(titleAnimation);
    startButtonAnimation(buttonAnimation);
    return () => {
      titleAnimation.stopAnimation();
      buttonAnimation.stopAnimation();
    };
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
            marginBottom: 20,
            fontSize: 36,
          }
        ]}
      >
        Scores
      </Animated.Text>
   
      <Surface style={localStyles.scoreContent} elevation={4}>
        
        {filteredScores.length > 0 ? (
          <View style={localStyles.listContainer}>
            <ScoreList scores={filteredScores} />
          </View>
        ) : (
          <View style={localStyles.emptyContainer}>
            <Text style={localStyles.emptyText}>No scores found</Text>
          </View>
        )}
      </Surface>

      <View style={localStyles.buttonContainer}>
        <BackButton buttonAnimation={buttonAnimation} onPress={onClose} />
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  scoreContent: {
    width: '100%',
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  }
});

export default ResultPage;