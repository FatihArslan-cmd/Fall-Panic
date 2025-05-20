import FallingObject, { generateRandomObject } from "../components/FallingObject";
import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { BOTTOM_MARGIN, CIRCLE_SIZE, screenHeight } from "../constants/index";
import { useGame } from "./GameContext";

const FallingObjectsManager = () => {
  const [objects, setObjects] = useState([]);
  const [objectCount, setObjectCount] = useState(0);
  const { positionX, gameOver, setGameOver } = useGame();
  const animationFrameId = useRef(null);
  const lastSpawnTime = useRef(Date.now());
  const spawnInterval = useRef(2500);
  const previousGameOver = useRef(gameOver);

  const spawnObject = () => {
    const newObject = generateRandomObject(objectCount);
    setObjects(prevObjects => [...prevObjects, newObject]);
    setObjectCount(prevCount => prevCount + 1);
  };

  const checkCollision = (object) => {
    const playerLeft = positionX;
    const playerRight = positionX + CIRCLE_SIZE;

    const playerTop = screenHeight - BOTTOM_MARGIN - CIRCLE_SIZE;
    const playerBottom = screenHeight - BOTTOM_MARGIN;

    const objectLeft = object.position.x;
    const objectRight = object.position.x + object.size;
    const objectTop = object.position.y;
    const objectBottom = object.position.y + object.size;

    return (
      objectRight > playerLeft &&
      objectLeft < playerRight &&
      objectBottom > playerTop &&
      objectTop < playerBottom
    );
  };

  useEffect(() => {
    if (gameOver) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      return;
    }

    const animate = () => {
      const currentTime = Date.now();

      if (currentTime - lastSpawnTime.current > spawnInterval.current) {
        spawnObject();
        lastSpawnTime.current = currentTime;
        spawnInterval.current = Math.max(1000, spawnInterval.current - 30);
      }

      setObjects(prevObjects => {
        let hasCollision = false;

        const updatedObjects = prevObjects
          .map(object => {
            const updatedObject = {
              ...object,
              position: {
                ...object.position,
                y: object.position.y + object.speed
              }
            };

            if (checkCollision(updatedObject)) {
              hasCollision = true;
            }

            return updatedObject;
          })
          .filter(object => object.position.y < screenHeight + object.size);

        if (hasCollision) {
          setGameOver(true);
        }

        return updatedObjects;
      });

      if (!gameOver) {
         animationFrameId.current = requestAnimationFrame(animate);
      }
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [positionX, gameOver, setGameOver]);

    useEffect(() => {
        if (previousGameOver.current === true && gameOver === false) {
            setObjects([]);
            lastSpawnTime.current = Date.now();
            spawnInterval.current = 2500;
            setObjectCount(0);
        }
        previousGameOver.current = gameOver;
    }, [gameOver]);


  return (
    <View>
      {objects.map((object) => (
        <FallingObject
          key={object.id}
          position={object.position}
          size={object.size}
          speed={object.speed}
          type={object.type}
          color={object.color}
          opacity={object.opacity}
        />
      ))}
    </View>
  );
};

export default FallingObjectsManager;