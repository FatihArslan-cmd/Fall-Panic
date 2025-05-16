import BackButton from "../../../src/components/BackIcon";
import GamePage from "fall-panic/src/pages/GamePage/GamePage";
import MenuPage from "fall-panic/src/pages/MenuPage/MenuPage";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('menu');

  const handleStartGame = () => {
    setCurrentScreen('game');
  };

  let content;
  if (currentScreen === 'menu') {
    content = <MenuPage onStartPress={handleStartGame} />;
  } else if (currentScreen === 'game') {
    content = <GamePage />;
  }

  return (
    <View style={styles.container}>
      <BackButton/>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;