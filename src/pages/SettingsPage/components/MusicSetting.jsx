import React, { useState } from "react";
import SettingItem from "./SettingItem";
import { Switch } from "react-native-paper";

const MusicSetting = () => {
  const [musicEnabled, setMusicEnabled] = useState(true);

  const toggleMusic = () => {
    setMusicEnabled(prev => !prev);
    // Here you would add the actual music toggle functionality
    // e.g., MusicManager.toggleMusic();
  };

  return (
    <SettingItem icon="music" title="Background Music">
      <Switch
        color="#D73901"
        value={musicEnabled}
        onValueChange={toggleMusic}
      />
    </SettingItem>
  );
};

export default MusicSetting;