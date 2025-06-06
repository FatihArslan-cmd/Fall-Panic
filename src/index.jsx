import GamePage from "fall-panic/src/pages/GamePage/GamePage";
import MenuPage from "fall-panic/src/pages/MenuPage/MenuPage";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('menu');

  const handleStartGame = () => {
    setCurrentScreen('game');
  };

  const handleGoToMenu = () => {
      setCurrentScreen('menu');
  };

  let content;
  if (currentScreen === 'menu') {
    content = <MenuPage onStartPress={handleStartGame} />;
  } else if (currentScreen === 'game') {
    content = <GamePage onGoToMenu={handleGoToMenu} />;
  }

  return (
    <View style={styles.container}>
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