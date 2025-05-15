import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

const { width, height } = Dimensions.get("window");
const LEAF_COUNT = 15;

const Leaf = ({ style, animatedValue }) => {
  const leafColors = ["#d73901", "#f5851f", "#8c5000", "#d9a566", "#ffbf00"];
  const leafSize = Math.random() * 15 + 15;
  const rotateInterpolate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <Animated.View
      style={[
        {
          width: leafSize,
          height: leafSize * 1.3,
          backgroundColor: leafColors[Math.floor(Math.random() * leafColors.length)],
          borderRadius: leafSize / 2,
          position: "absolute",
          transform: [
            { rotate: rotateInterpolate },
            { scale: animatedValue.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 1.2, 1] }) }
          ]
        },
        style
      ]}
    />
  );
};

const MenuPage = ({ onStartPress }) => {
  const accentColor = '#d73901';
  const [leaves, setLeaves] = useState([]);
  const titleAnimation = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(0)).current;

  const logoScale = titleAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.08, 1]
  });

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(titleAnimation, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(titleAnimation, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        })
      ])
    ).start();

    Animated.timing(buttonAnimation, {
      toValue: 1,
      duration: 800,
      easing: Easing.elastic(1),
      useNativeDriver: true,
      delay: 300
    }).start();

    const newLeaves = [];
    for (let i = 0; i < LEAF_COUNT; i++) {
      const startX = Math.random() * width;
      const endX = startX + (Math.random() * 200 - 100);
      const startY = -50;
      const duration = Math.random() * 6000 + 5000;
      const delay = Math.random() * 5000;
      const animValue = new Animated.Value(0);

      newLeaves.push({
        id: i,
        startX,
        endX,
        startY,
        duration,
        delay,
        animValue
      });

      Animated.loop(
        Animated.sequence([
          Animated.timing(animValue, {
            toValue: 1,
            duration: duration,
            easing: Easing.linear,
            useNativeDriver: true,
            delay: delay
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true
          })
        ])
      ).start();
    }
    setLeaves(newLeaves);
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
          buttonColor={accentColor}
          labelStyle={styles.buttonText}
        >
          Start Game
        </Button>

        <Button
          mode="outlined"
          onPress={() => console.log('Ayarlar Düğmesi Basıldı')}
          style={[styles.button, { borderColor: accentColor, borderWidth: 2 }]}
          labelStyle={[styles.buttonTextOutlined, { color: accentColor }]}
        >
          Settings
        </Button>
        
        <Button
          mode="outlined"
          onPress={() => console.log('Skorlar Düğmesi Basıldı')}
          style={[styles.button, { borderColor: accentColor, borderWidth: 2 }]}
          labelStyle={[styles.buttonTextOutlined, { color: accentColor }]}
        >
          Scores
        </Button>
      
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f2e8',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 235, 205, 0.2)',
  },
  title: {
    fontSize: 42,
    fontFamily: 'Orbitron-ExtraBold',
    marginBottom: 50,
    color: '#d73901',
    letterSpacing: 2,
  },
  button: {
    marginVertical: 10,
    width: 300,
    borderRadius: 15,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Orbitron-ExtraBold',
    letterSpacing: 1,
  },
  buttonTextOutlined: {
    fontSize: 18,
    fontFamily: 'Orbitron-ExtraBold',
    letterSpacing: 1,
  },
});

export default MenuPage;