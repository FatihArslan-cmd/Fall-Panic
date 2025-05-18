import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { COLORS } from "../constants/colors";
import { styles } from "../styles/MenuStyle";

const QuitButton = () => {
  const quitColor = COLORS.danger || '#E53935';
  const navigation = useNavigation();
  const handleQuitGame = () => {
     
       navigation.goBack();

    
  };

  return (
    <Button
      mode="outlined"
      onPress={handleQuitGame}
      style={[
        styles.button,
        {
          borderColor: quitColor,
          borderWidth: 2,
          marginTop: 15,
        }
      ]}
      labelStyle={[
        styles.buttonTextOutlined,
        { color: quitColor }
      ]}
    >
      Quit Game
    </Button>
  );
};

export default QuitButton;