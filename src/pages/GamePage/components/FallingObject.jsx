import React from "react";
import Svg, { Circle, Polygon, Rect } from "react-native-svg";
import { StyleSheet, View } from "react-native";
import { SCORE_ITEM_COLOR, SCORE_ITEM_PROBABILITY, SCORE_VALUE, objectColors, objectTypes, screenWidth } from "../constants/index";

const FallingObject = ({ position, size, speed, type, color, opacity }) => {
  const renderShape = () => {
    const center = size / 2;
    const shapeSize = size * 0.8;
    const shapeOffset = size * 0.1;

    switch (type) {
      case "circle":
        return <Circle cx={center} cy={center} r={shapeSize / 2} fill={color} />;
      case "square":
        return (
          <Rect
            x={shapeOffset}
            y={shapeOffset}
            width={shapeSize}
            height={shapeSize}
            fill={color}
          />
        );
      case "triangle":
        return (
          <Polygon
            points={`${center},${shapeOffset} ${shapeOffset},${size - shapeOffset} ${size - shapeOffset},${size - shapeOffset}`}
            fill={color}
          />
        );
      default:
        return <Circle cx={center} cy={center} r={shapeSize / 2} fill={color} />;
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FallingObject;

export const generateRandomObject = (objectCount) => {
  const size = Math.floor(Math.random() * 40) + 20;
  const type = objectTypes[Math.floor(Math.random() * objectTypes.length)];
  const x = Math.random() * (screenWidth - size);
  const opacity = 1.0;
  // Hız ayarı ilk kodunuzdaki gibi geri alındı (25 ile 28 arası)
  const speed = Math.random() * 3 + 25;

  const isScoreItem = Math.random() < SCORE_ITEM_PROBABILITY;
  const color = isScoreItem ? SCORE_ITEM_COLOR : objectColors[Math.floor(Math.random() * objectColors.length)];
  const scoreValue = isScoreItem ? SCORE_VALUE : 0;

  return {
    id: `object-${objectCount}`,
    position: { x, y: -size },
    size,
    type,
    color,
    opacity,
    speed,
    isScoreItem,
    scoreValue,
  };
};