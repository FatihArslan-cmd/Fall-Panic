import React, { useState } from "react";
import SettingItem from "./SettingItem";
import { Switch } from "react-native-paper";

const VibrationSetting = () => {
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  const toggleVibration = () => {
    setVibrationEnabled(prev => !prev);
    // Here you would add the actual vibration toggle functionality
    // e.g., VibrationManager.toggleVibration();
  };

  return (
    <SettingItem icon="vibrate" title="Vibration">
      <Switch
        color="#D73901"
        value={vibrationEnabled}
        onValueChange={toggleVibration}
      />
    </SettingItem>
  );
};

export default VibrationSetting;