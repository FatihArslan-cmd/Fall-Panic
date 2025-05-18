import CustomModal from "../../../../../../src/components/CustomModal";
import React from "react";
import { Text } from "react-native-paper";
import { useGame } from "../context/GameContext";

const GameOverOverlay = () => {
  const { gameOver, score, restartGame } = useGame();

  if (!gameOver) return null;

  return (
    <CustomModal
      visible={gameOver} 
      title="Game Over!" 
      showConfirmButton={true} 
      confirmText="Play Again"
      onConfirm={restartGame}
      onDismiss={restartGame}
    >
        <Text style={{ fontSize: 20,textAlign:'center', fontFamily: 'Orbitron-ExtraBold',paddingVertical:30 }}>
            Your score is {score}
        </Text>
    </CustomModal>
  );
};


export default GameOverOverlay;