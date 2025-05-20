import React from "react";
import Svg, { Circle, Polygon, Rect } from "react-native-svg";
import { StyleSheet, View } from "react-native";

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