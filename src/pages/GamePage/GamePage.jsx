import FallingObjectsManager from "fall-panic/src/pages/GamePage/context/FallingObjectsManager";
import GameOverOverlay from "fall-panic/src/pages/GamePage/components/GameOverOverlay";
import InputController from "fall-panic/src/pages/GamePage/components/InputController";
import Player from "fall-panic/src/pages/GamePage/components/Player";
import React from "react";
import ScoreDisplay from "fall-panic/src/pages/GamePage/components/ScoreDisplay";
import { StyleSheet, View } from "react-native";
import { GameProvider } from "./context/GameContext";

const GamePage = ({ onGoToMenu }) => {
  return (
    <GameProvider>
      <InputController>
        <View style={styles.container}>
          <View style={styles.background} />

          <FallingObjectsManager />
          <Player />
          <ScoreDisplay />

          <GameOverOverlay onGoToMenu={onGoToMenu} />
        </View>
      </InputController>
    </GameProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#f8f2e8",
  },
});

export default GamePage;