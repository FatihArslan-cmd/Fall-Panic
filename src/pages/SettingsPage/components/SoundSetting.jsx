import React, { useEffect, useState } from "react";
import SettingItem from "./SettingItem";
import { Platform, ToastAndroid } from "react-native";
import { Switch } from "react-native-paper";
import { storage } from "../../../../../../src/utils/storage";

const SoundSetting = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const storedSoundEnabled = storage.getBoolean('soundEnabled');
    if (storedSoundEnabled !== undefined) {
      setSoundEnabled(storedSoundEnabled);
    }
  }, []);

  const toggleSound = () => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    storage.set('soundEnabled', newValue);

    if (Platform.OS === "android") {
      ToastAndroid.show(`Sound ${newValue ? "enabled" : "disabled"}`, ToastAndroid.SHORT);
    }
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