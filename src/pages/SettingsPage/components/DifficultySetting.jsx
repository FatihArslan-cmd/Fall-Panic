import React, { useEffect, useState } from "react";
import SettingItem from "./SettingItem";
import { Platform, ToastAndroid } from "react-native";
import { RadioButton } from "react-native-paper";
import { storage } from "../../../../../../src/utils/storage";

const DifficultySetting = () => {
  const [difficulty, setDifficulty] = useState("medium");

  useEffect(() => {
    const storedDifficulty = storage.getString('difficulty');
    if (storedDifficulty !== undefined) {
      setDifficulty(storedDifficulty);
    }
  }, []);

  const handleDifficultyChange = (value) => {
    setDifficulty(value);
    storage.set('difficulty', value);

    if (Platform.OS === "android") {
      ToastAndroid.show(`Difficulty set to ${value}`, ToastAndroid.SHORT);
    }
  };

  const labelFontStyle = {
    fontFamily: 'Orbitron-ExtraBold',
  };

  const rippleRed = "#D73901";

  return (
    <SettingItem
      icon="gamepad-variant"
      title="Difficulty"
      contentLayout="stacked"
    >
      <RadioButton.Group
        onValueChange={handleDifficultyChange}
        value={difficulty}
      >
        <RadioButton.Item
          label="Easy"
          color={rippleRed}
          rippleColor={rippleRed}
          value="easy"
          labelStyle={labelFontStyle}
        />
        <RadioButton.Item
          label="Medium"
          color={rippleRed}
          rippleColor={rippleRed}
          value="medium"
          labelStyle={labelFontStyle}
        />
        <RadioButton.Item
          label="Hard"
          color={rippleRed}
          rippleColor={rippleRed}
          value="hard"
          labelStyle={labelFontStyle}
        />
      </RadioButton.Group>
    </SettingItem>
  );
};

export default DifficultySetting;