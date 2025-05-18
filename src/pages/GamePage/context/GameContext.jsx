import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { CIRCLE_SIZE, MOVEMENT_SPEED, screenWidth } from "../constants/index";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [positionX, setPositionX] = useState((screenWidth - CIRCLE_SIZE) / 2);
  const [isMoving, setIsMoving] = useState({ left: false, right: false });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const scoreTimerId = useRef(null);
  const animationFrameId = useRef(null);

  const handleTouchStart = (touchX) => {
    if (gameOver) return; 
    
    const circleCenterX = positionX + CIRCLE_SIZE / 2;
    setIsMoving({ 
      left: touchX < circleCenterX, 
      right: touchX > circleCenterX 
    });
  };

  const handleTouchEnd = () => {
    setIsMoving({ left: false, right: false });
  };

  const restartGame = () => {
    setGameOver(false);
    setScore(0);
    setPositionX((screenWidth - CIRCLE_SIZE) / 2); 
  };

  useEffect(() => {
    const animate = () => {
      setPositionX(prev => {
        let newX = prev;
        if (isMoving.left) newX -= MOVEMENT_SPEED;
        if (isMoving.right) newX += MOVEMENT_SPEED;
        return Math.max(0, Math.min(screenWidth - CIRCLE_SIZE, newX));
      });
      animationFrameId.current = requestAnimationFrame(animate);
    };

    if ((isMoving.left || isMoving.right) && !gameOver) {
      animationFrameId.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isMoving, gameOver]);

  useEffect(() => {
    if (gameOver) {
      if (scoreTimerId.current) {
        clearInterval(scoreTimerId.current);
      }
      return;
    }

    scoreTimerId.current = setInterval(() => {
      setScore(prevScore => prevScore + 1);
    }, 1000);

    return () => {
      if (scoreTimerId.current) {
        clearInterval(scoreTimerId.current);
      }
    };
  }, [gameOver]);

  return (
    <GameContext.Provider 
      value={{ 
        positionX, 
        handleTouchStart, 
        handleTouchEnd,
        gameOver,
        setGameOver,
        score,
        restartGame
      }}
    >
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