import React, { useState } from "react";
import SettingItem from "./SettingItem";
import { Switch } from "react-native-paper";

const SoundSetting = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
    // Here you would add the actual sound toggle functionality
    // e.g., SoundManager.toggleSound();
  };

  return (
    <SettingItem icon="volume-high" title="Sound Effects">
      <Switch
        color="#D73901"
        value={soundEnabled}
        onValueChange={toggleSound}
      />
    </SettingItem>
  );
};

export default SoundSetting;