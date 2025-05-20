import React, { useEffect, useState } from "react";
import SettingItem from "./SettingItem";
import { Platform, ToastAndroid } from "react-native";
import { Switch } from "react-native-paper";
import { storage } from "../../../../../../src/utils/storage";

const VibrationSetting = () => {
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  useEffect(() => {
    const storedVibrationEnabled = storage.getBoolean('vibrationEnabled');
    if (storedVibrationEnabled !== undefined) {
      setVibrationEnabled(storedVibrationEnabled);
    }
  }, []);

  const toggleVibration = () => {
    const newValue = !vibrationEnabled;
    setVibrationEnabled(newValue);
    storage.set('vibrationEnabled', newValue);

    if (Platform.OS === "android") {
      ToastAndroid.show(`Vibration ${newValue ? "enabled" : "disabled"}`, ToastAndroid.SHORT);
    }
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