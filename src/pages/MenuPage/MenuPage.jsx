import Leaf from "./components/Leaf";
import React, { useEffect, useRef, useState } from "react";
import { Animated, View } from "react-native";
import { Button } from "react-native-paper";
import { COLORS } from "./constants/colors";
import { height } from "./constants/dimensions";
import { LEAF_COUNT } from "./constants/dimensions";
import { styles } from "./styles/MenuStyle";

import {
  startTitleAnimation,
  startButtonAnimation,
  createLeaves
} from "./utils/animations";

const MenuPage = ({ onStartPress }) => {
  const [leaves, setLeaves] = useState([]);
  const titleAnimation = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(0)).current;

  const logoScale = titleAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.08, 1]
  });

  useEffect(() => {
    startTitleAnimation(titleAnimation);
    startButtonAnimation(buttonAnimation);

    setLeaves(createLeaves(LEAF_COUNT));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.overlay} />

      {leaves.map(leaf => {
        const moveY = leaf.animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [leaf.startY, height + 100]
        });

        const moveX = leaf.animValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [leaf.startX, leaf.endX, leaf.startX - 50]
        });

        return (
          <Leaf
            key={leaf.id}
            style={{
              left: 0,
              top: 0,
              transform: [
                { translateX: moveX },
                { translateY: moveY }
              ]
            }}
            animatedValue={leaf.animValue}
          />
        );
      })}

      <Animated.Text
        style={[
          styles.title,
          {
            transform: [{ scale: logoScale }],
            textShadowColor: 'rgba(215, 57, 1, 0.5)',
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 10
          }
        ]}
      >
        Fall Panic
      </Animated.Text>

      <Animated.View style={{
        opacity: buttonAnimation,
        transform: [{ translateY: buttonAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0]
        })}]
      }}>
        <Button
          mode="contained"
          onPress={onStartPress}
          style={styles.button}
          buttonColor={COLORS.primary}
          labelStyle={styles.buttonText}
        >
          Start Game
        </Button>

        <Button
          mode="outlined"
          onPress={() => console.log('Ayarlar Düğmesi Basıldı')}
          style={[styles.button, { borderColor: COLORS.primary, borderWidth: 2 }]}
          labelStyle={[styles.buttonTextOutlined, { color: COLORS.primary }]}
        >
          Settings
        </Button>

        <Button
          mode="outlined"
          onPress={() => console.log('Skorlar Düğmesi Basıldı')}
          style={[styles.button, { borderColor: COLORS.primary, borderWidth: 2 }]}
          labelStyle={[styles.buttonTextOutlined, { color: COLORS.primary }]}
        >
          Scores
        </Button>

      </Animated.View>
    </View>
  );
};

export default MenuPage;