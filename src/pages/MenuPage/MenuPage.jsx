import Leaf from "./components/Leaf";
import QuitButton from "./components/QuitButton";
import React, { useEffect, useRef, useState } from "react";
import ResultPage from "fall-panic/src/pages/ResultPage/ResultPage";
import SettingsPage from "fall-panic/src/pages/SettingsPage/SettingsPage";
import { Animated, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { COLORS } from "./constants/colors";
import { height } from "./constants/dimensions";
import { LEAF_COUNT } from "./constants/dimensions";
import { styles } from "./styles/MenuStyle";

import {
  startTitleAnimation,
  startButtonAnimation,
  createLeaves
} from "./utils/animations";

const DISPLAY_STATE = {
  MENU: 'menu',
  SETTINGS: 'settings',
  SCORES: 'scores',
};

const MenuPage = ({ onStartPress }) => {
  const [displayState, setDisplayState] = useState(DISPLAY_STATE.MENU);
  const [leaves, setLeaves] = useState([]);
  const titleAnimation = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(0)).current;

  const logoScale = titleAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.08, 1]
  });

  useEffect(() => {
    setLeaves(createLeaves(LEAF_COUNT));
  }, []);

  useEffect(() => {
      const stopAndResetAnimations = () => {
          titleAnimation.stopAnimation();
          buttonAnimation.stopAnimation();
          titleAnimation.setValue(0);
          buttonAnimation.setValue(0);
      };

      if (displayState === DISPLAY_STATE.MENU) {
           startTitleAnimation(titleAnimation);
           startButtonAnimation(buttonAnimation);
      } else {
           stopAndResetAnimations();
      }

      return () => {
         stopAndResetAnimations();
      };

  }, [displayState, titleAnimation, buttonAnimation]);


  const handleBackToMenu = () => {
      setDisplayState(DISPLAY_STATE.MENU);
  };

  const goToSettings = () => {
      titleAnimation.stopAnimation();
      buttonAnimation.stopAnimation();
      setDisplayState(DISPLAY_STATE.SETTINGS);
  };

  const goToScores = () => {
      titleAnimation.stopAnimation();
      buttonAnimation.stopAnimation();
      setDisplayState(DISPLAY_STATE.SCORES);
  };

  const renderForegroundContent = () => {
    switch (displayState) {
      case DISPLAY_STATE.SETTINGS:
        return <SettingsPage onClose={handleBackToMenu} />;
      case DISPLAY_STATE.SCORES:
        return <ResultPage onClose={handleBackToMenu} />;
      case DISPLAY_STATE.MENU:
      default:
        return (
          <View key="menu-content" style={localStyles.menuForegroundContent}>
            <Animated.Text
              style={[
                styles.title,
                {
                  transform: [{ scale: logoScale }],
                  textShadowColor: 'rgba(215, 57, 1, 0.5)',
                  textShadowOffset: { width: 0, height: 2 },
                  textShadowRadius: 10,
                  marginBottom: 40,
                }
              ]}
            >
              Fall Panic
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
                onPress={onStartPress}
                style={styles.button}
                buttonColor={COLORS.primary}
                labelStyle={styles.buttonText}
              >
                Start Game
              </Button>

              <Button
                mode="outlined"
                onPress={goToSettings}
                style={[styles.button, { borderColor: COLORS.primary, borderWidth: 2 }]}
                labelStyle={[styles.buttonTextOutlined, { color: COLORS.primary }]}
              >
                Settings
              </Button>

              <Button
                mode="outlined"
                onPress={goToScores}
                style={[styles.button, { borderColor: COLORS.primary, borderWidth: 2 }]}
                labelStyle={[styles.buttonTextOutlined, { color: COLORS.primary }]}
              >
                Scores
              </Button>

              <QuitButton  />

            </Animated.View>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay} />

      {leaves.map(leaf => {
        const moveY = leaf.animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [leaf.startY, height + 100]
        });

        const moveX = leaf.animValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [leaf.startX, leaf.endX, leaf.startX - 50]
        });

        return (
          <Leaf
            key={leaf.id}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              transform: [
                { translateX: moveX },
                { translateY: moveY }
              ]
            }}
            animatedValue={leaf.animValue}
          />
        );
      })}

      <View style={localStyles.foregroundContainer}>
        {renderForegroundContent()}
      </View>

    </View>
  );
};

const localStyles = StyleSheet.create({
    foregroundContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    menuForegroundContent: {
        alignItems: 'center',
    },
});

export default MenuPage;