import React from "react";
import { StyleSheet, View } from "react-native"; // View hala react-native";
import { Text } from "react-native-paper";
import { useGame } from "../context/GameContext";

const ScoreDisplay = () => {
  const { score } = useGame();

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Score: {score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 15,
    zIndex: 10, 
  },
  scoreText: {
    color: "white",
    fontSize: 18,
    fontFamily:'Orbitron-ExtraBold',
  },
});

export default ScoreDisplay;