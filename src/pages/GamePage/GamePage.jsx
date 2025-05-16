import Player from "fall-panic/src/pages/GamePage/components/Player";
import React from "react";
import { GameProvider, useGame } from "fall-panic/src/pages/GamePage/context/GameContext";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

const GamePageContent = () => {
  const { circlePositionX, handleTouchStart, handleTouchEnd } = useGame();

  return (
    <TouchableWithoutFeedback onPressIn={handleTouchStart} onPressOut={handleTouchEnd}>
      <View style={styles.container}>
        <Player positionX={circlePositionX} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const GamePage = () => {
  return (
    <GameProvider>
      <GamePageContent />
    </GameProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f2e8',
  },
});

export default GamePage;