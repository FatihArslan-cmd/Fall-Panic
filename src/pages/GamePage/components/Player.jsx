import React from "react";
import { StyleSheet, View } from "react-native";
import { BOTTOM_MARGIN, CIRCLE_SIZE } from "../constants/index";

const Player = ({ positionX }) => {
  return (
    <View
      style={[
        styles.player,
        {
          left: positionX,
          bottom: BOTTOM_MARGIN, // Alt boşluk sabit olduğu için burada da kullanılabilir
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  player: {
    position: 'absolute', // Mutlak konumlandırma gereklidir
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: 'dodgerblue',
  },
});

export default Player;