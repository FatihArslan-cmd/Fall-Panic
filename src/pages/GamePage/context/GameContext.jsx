import React, { createContext, useContext, useEffect, useRef, useState } from "react";

import {
  CIRCLE_SIZE,
  MOVEMENT_SPEED,
  SCREEN_WIDTH,
} from '../constants/index';

const GameContext = createContext(undefined);

export const GameProvider = ({ children }) => {
  const [circlePositionX, setCirclePositionX] = useState((SCREEN_WIDTH - CIRCLE_SIZE) / 2);
  const [isMovingLeft, setIsMovingLeft] = useState(false);
  const [isMovingRight, setIsMovingRight] = useState(false);

  const animationFrameId = useRef(null);

  const handleTouchStart = (event) => {
    const touchX = event.nativeEvent.locationX;
    const circleCenterX = circlePositionX + CIRCLE_SIZE / 2;

    if (touchX > circleCenterX) {
      setIsMovingRight(true);
      setIsMovingLeft(false);
    } else if (touchX < circleCenterX) {
      setIsMovingLeft(true);
      setIsMovingRight(false);
    }
  };

  const handleTouchEnd = () => {
    setIsMovingLeft(false);
    setIsMovingRight(false);
  };

  useEffect(() => {
    const animate = () => {
      setCirclePositionX(prevPositionX => {
        let newPositionX = prevPositionX;

        if (isMovingLeft) {
          newPositionX = prevPositionX - MOVEMENT_SPEED;
        } else if (isMovingRight) {
          newPositionX = prevPositionX + MOVEMENT_SPEED;
        }

        newPositionX = Math.max(0, newPositionX);
        newPositionX = Math.min(SCREEN_WIDTH - CIRCLE_SIZE, newPositionX);

        return newPositionX;
      });

      if (isMovingLeft || isMovingRight) {
        animationFrameId.current = requestAnimationFrame(animate);
      }
    };

    if (isMovingLeft || isMovingRight) {
       if (animationFrameId.current) {
         cancelAnimationFrame(animationFrameId.current);
       }
      animationFrameId.current = requestAnimationFrame(animate);
    } else {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };

  }, [isMovingLeft, isMovingRight]);

  const contextValue = {
    circlePositionX,
    handleTouchStart,
    handleTouchEnd,
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};