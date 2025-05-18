import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { useGame } from "../context/GameContext";

const InputController = ({ children }) => {
  const { handleTouchStart, handleTouchEnd } = useGame();
  
  return (
    <TouchableWithoutFeedback
      onPressIn={(e) => handleTouchStart(e.nativeEvent.locationX)}
      onPressOut={handleTouchEnd}
    >
      {children}
    </TouchableWithoutFeedback>
  );
};

export default InputController;