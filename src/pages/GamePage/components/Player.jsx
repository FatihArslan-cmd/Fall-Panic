import React from "react";
import Svg, { Circle, Ellipse, G, Path } from "react-native-svg";
import { StyleSheet, View } from "react-native";
import { BOTTOM_MARGIN, CIRCLE_SIZE } from "../constants/index";
import { useGame } from "../context/GameContext";

const Player = () => {
  const { positionX } = useGame();
  const center = CIRCLE_SIZE / 2;
  const eyeOffset = CIRCLE_SIZE / 4;
  const eyeY = CIRCLE_SIZE / 3;
  const eyeRadius = CIRCLE_SIZE / 10;

  return (
    <View
      style={[
        styles.container,
        { left: positionX, bottom: BOTTOM_MARGIN }
      ]}
    >
      <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE}>
        <Circle
          cx={center}
          cy={center}
          r={center}
          fill="#3a86ff"
          opacity={0.9}
        />
        
        <Circle
          cx={center - center/3}
          cy={center - center/3}
          r={center/2.5}
          fill="white"
          opacity={0.3}
        />
        
        <G>
          <Circle
            cx={center - eyeOffset}
            cy={eyeY}
            r={eyeRadius * 1.2}
            fill="white"
          />
          
          <Circle
            cx={center + eyeOffset}
            cy={eyeY}
            r={eyeRadius * 1.2}
            fill="white"
          />
          
          <Circle
            cx={center - eyeOffset}
            cy={eyeY}
            r={eyeRadius * 0.7}
            fill="#1a1a2e"
          />
          <Circle
            cx={center + eyeOffset}
            cy={eyeY}
            r={eyeRadius * 0.7}
            fill="#1a1a2e"
          />
          
          <Circle
            cx={center - eyeOffset - eyeRadius * 0.3}
            cy={eyeY - eyeRadius * 0.3}
            r={eyeRadius * 0.25}
            fill="white"
          />
          <Circle
            cx={center + eyeOffset - eyeRadius * 0.3}
            cy={eyeY - eyeRadius * 0.3}
            r={eyeRadius * 0.25}
            fill="white"
          />
        </G>
        
        <Path
          d={`M ${center - center/2.5} ${center + center/4} 
              Q ${center} ${center + center/2}, 
              ${center + center/2.5} ${center + center/4}`}
          stroke="white"
          strokeWidth={CIRCLE_SIZE / 25}
          fill="transparent"
        />
        
        <Circle
          cx={center - eyeOffset * 1.1}
          cy={center + center/6}
          r={eyeRadius * 0.8}
          fill="#ff6b6b"
          opacity={0.3}
        />
        <Circle
          cx={center + eyeOffset * 1.1}
          cy={center + center/6}
          r={eyeRadius * 0.8}
          fill="#ff6b6b"
          opacity={0.3}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});

export default Player;