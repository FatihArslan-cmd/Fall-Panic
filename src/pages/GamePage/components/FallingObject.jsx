import React from "react";
import Svg, { Circle, Polygon, Rect } from "react-native-svg";
import { screenWidth } from "fall-panic/src/pages/GamePage/constants";
import { StyleSheet, View } from "react-native";

const objectTypes = ["circle", "square", "triangle"];
const objectColors = ["#ff6b6b", "#4ecdc4", "#ffbe0b", "#fb5607", "#8338ec"];

const FallingObject = ({ position, size, speed, type, color, opacity }) => {
  const renderShape = () => {
    const center = size / 2;
    
    switch (type) {
      case "circle":
        return <Circle cx={center} cy={center} r={center * 0.8} fill={color} />;
      case "square":
        return (
          <Rect
            x={size * 0.1}
            y={size * 0.1}
            width={size * 0.8}
            height={size * 0.8}
            fill={color}
          />
        );
      case "triangle":
        return (
          <Polygon
            points={`${center},${size * 0.1} ${size * 0.1},${size * 0.9} ${size * 0.9},${size * 0.9}`}
            fill={color}
          />
        );
      default:
        return <Circle cx={center} cy={center} r={center * 0.8} fill={color} />;
    }
  };

  return (
    <View style={[styles.container, { left: position.x, top: position.y, width: size, height: size, opacity }]}>
      <Svg width={size} height={size}>{renderShape()}</Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
});

export default FallingObject;

export const generateRandomObject = (objectCount) => {
  const size = Math.floor(Math.random() * 40) + 20; 
  const type = objectTypes[Math.floor(Math.random() * objectTypes.length)];
  const color = objectColors[Math.floor(Math.random() * objectColors.length)];
  const x = Math.random() * (screenWidth - size);
  const opacity = 1.0 
  const speed = Math.random() * 3 + 25;

  return {
    id: `object-${objectCount}`,
    position: { x, y: -size }, 
    size,
    type,
    color,
    opacity,
    speed
  };
};