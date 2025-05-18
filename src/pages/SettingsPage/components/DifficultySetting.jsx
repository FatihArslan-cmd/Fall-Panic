import React, { useState } from "react";
import SettingItem from "./SettingItem";
import { StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";

const DifficultySetting = () => {
  const [difficulty, setDifficulty] = useState("medium");

  const handleDifficultyChange = (value) => {
    setDifficulty(value);
    console.log("Difficulty changed to:", value);
  };

  const labelFontStyle = {
      fontFamily:'Orbitron-ExtraBold',
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
        style={styles.radioButtonGroupRow}
      >
        <RadioButton.Item
          label="Easy"
          color="#D73901" 
          rippleColor={rippleRed} 
          value="easy"
          labelStyle={labelFontStyle}
        />
        <RadioButton.Item
          label="Medium"
          color="#D73901" 
          rippleColor={rippleRed} 
          value="medium"
          labelStyle={labelFontStyle}
        />
        <RadioButton.Item
          label="Hard"
          color="#D73901" 
          rippleColor={rippleRed} 
          value="hard"
          labelStyle={labelFontStyle}
        />
      </RadioButton.Group>
    </SettingItem>
  );
};

const styles = StyleSheet.create({
  radioButtonGroupRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default DifficultySetting;