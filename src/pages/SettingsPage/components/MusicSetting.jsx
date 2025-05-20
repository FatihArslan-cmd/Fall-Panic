import React, { useEffect, useState } from "react";
import SettingItem from "./SettingItem";
import { Platform, ToastAndroid } from "react-native";
import { Switch } from "react-native-paper";
import { storage } from "../../../../../../src/utils/storage";

const MusicSetting = () => {
  const [musicEnabled, setMusicEnabled] = useState(true);

  useEffect(() => {
    const storedMusicEnabled = storage.getBoolean('musicEnabled');
    if (storedMusicEnabled !== undefined) {
      setMusicEnabled(storedMusicEnabled);
    }
  }, []);

  const toggleMusic = () => {
    const newValue = !musicEnabled;
    setMusicEnabled(newValue);
    storage.set('musicEnabled', newValue);

    if (Platform.OS === "android") {
      ToastAndroid.show(`Music ${newValue ? "enabled" : "disabled"}`, ToastAndroid.SHORT);
    }
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