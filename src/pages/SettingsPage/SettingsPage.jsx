import BackButton from "fall-panic/src/components/BackButton";
import DifficultySetting from "fall-panic/src/pages/SettingsPage/components/DifficultySetting";
import MusicSetting from "fall-panic/src/pages/SettingsPage/components/MusicSetting";
import React, { useEffect, useRef } from "react";
import SoundSetting from "fall-panic/src/pages/SettingsPage/components/SoundSetting";
import VibrationSetting from "fall-panic/src/pages/SettingsPage/components/VibrationSetting";
import { styles } from "fall-panic/src/pages/SettingsPage/styles/SettingsPageStyles";
import { Animated, View } from "react-native";
import { styles as menuStyles } from "../MenuPage/styles/MenuStyle";
import { startButtonAnimation, startTitleAnimation } from "../MenuPage/utils/animations";

const SettingsPage = ({ onClose }) => {
  const titleAnimation = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(0)).current;
  const settingsAnimation = useRef(new Animated.Value(0)).current;

  const titleScale = titleAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.08, 1]
  });

  const settingsOpacity = settingsAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  const settingsTranslateY = settingsAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0]
  });

  useEffect(() => {
    startTitleAnimation(titleAnimation);
    startButtonAnimation(buttonAnimation);

    Animated.timing(settingsAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [titleAnimation, buttonAnimation, settingsAnimation]);

  return (
      <View style={styles.container}>
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
          Settings
        </Animated.Text>

          <Animated.View
            style={[
              styles.settingsContainer, 
              {
                opacity: settingsOpacity,
                transform: [{ translateY: settingsTranslateY }]
              }
            ]}
          >
            <SoundSetting />
            <MusicSetting />
            <VibrationSetting />
            <DifficultySetting />
          </Animated.View>


        <BackButton buttonAnimation={buttonAnimation} onPress={onClose} />
      </View>
  );
};

export default SettingsPage;