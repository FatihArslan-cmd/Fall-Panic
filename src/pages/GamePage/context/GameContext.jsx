import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Vibration } from "react-native";
import { ToastService } from "../../../../../../src/context/ToastService";
import { storage } from "../../../../../../src/utils/storage";
import { CIRCLE_SIZE, MOVEMENT_SPEED, screenWidth } from "../constants/index";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [positionX, setPositionX] = useState((screenWidth - CIRCLE_SIZE) / 2);
  const [isMoving, setIsMoving] = useState({ left: false, right: false });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const [gameDifficulty, setGameDifficulty] = useState('easy');

  const scoreTimerId = useRef(null);
  const animationFrameId = useRef(null);

  const triggeredScoreThresholds = useRef(new Set());

  useEffect(() => {
      const storedDifficulty = storage.getString('difficulty');
      const validDifficulties = ['easy', 'medium', 'hard'];

      if (storedDifficulty !== undefined && validDifficulties.includes(storedDifficulty)) {
          setGameDifficulty(storedDifficulty);
      }
  }, []);


  const handleTouchStart = (touchX) => {
    if (gameOver) return;

    const screenHalf = screenWidth / 2;
    setIsMoving({
      left: touchX < screenHalf,
      right: touchX >= screenHalf
    });
  };

  const handleTouchEnd = () => {
    setIsMoving({ left: false, right: false });
  };

  const restartGame = () => {
    setGameOver(false);
    setScore(0);
    setPositionX((screenWidth - CIRCLE_SIZE) / 2);
    if (scoreTimerId.current) {
      clearInterval(scoreTimerId.current);
      scoreTimerId.current = null;
    }
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    setIsMoving({ left: false, right: false });
    triggeredScoreThresholds.current.clear();
  };

  const addScore = (points) => {
    if (!gameOver) {
      setScore(prevScore => prevScore + points);
    }
  };

  useEffect(() => {
    const animatePlayerMovement = () => {
      setPositionX(prev => {
        let newX = prev;
        if (isMoving.left) newX -= MOVEMENT_SPEED;
        if (isMoving.right) newX += MOVEMENT_SPEED;
        return Math.max(0, Math.min(screenWidth - CIRCLE_SIZE, newX));
      });

      if ((isMoving.left || isMoving.right) && !gameOver) {
        animationFrameId.current = requestAnimationFrame(animatePlayerMovement);
      } else {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = null;
        }
      }
    };

    if ((isMoving.left || isMoving.right) && !gameOver && animationFrameId.current === null) {
        animationFrameId.current = requestAnimationFrame(animatePlayerMovement);
    } else if (!(isMoving.left || isMoving.right) || gameOver) {
         if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null;
        }
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
  }, [isMoving, gameOver]);

  useEffect(() => {
    if (gameOver) {
      if (scoreTimerId.current) {
        clearInterval(scoreTimerId.current);
        scoreTimerId.current = null;
      }

      try {
        const vibrationEnabled = storage.getBoolean('vibrationEnabled');
        if (vibrationEnabled === true) {
          Vibration.vibrate(300);
        }
      } catch (e) {
        console.error("Failed to check vibration setting or vibrate:", e);
      }

      try {
        const existingResultsString = storage.getString('gameResults');
        let existingResults = [];

        if (existingResultsString) {
          try {
            existingResults = JSON.parse(existingResultsString);
            if (!Array.isArray(existingResults)) {
              existingResults = [];
            }
          } catch (parseError) {
            existingResults = [];
          }
        }

        const newResult = {
          score: score,
          date: new Date().toISOString(),
          difficulty: gameDifficulty,
        };

        const updatedResults = [newResult, ...existingResults];

        const MAX_RESULTS_TO_STORE = 20;
        const finalResultsToSave = updatedResults.slice(0, MAX_RESULTS_TO_STORE);

        storage.set('gameResults', JSON.stringify(finalResultsToSave));
      } catch (error) {
        console.error("Failed to save game result:", error);
      }

      return;
    }

    if (!scoreTimerId.current) {
      scoreTimerId.current = setInterval(() => {
        setScore(prevScore => prevScore + 1);
      }, 1000);
    }

    const scoreThresholds = [
      { threshold: 25, message: "You reached 25 points!", type: "success" },
      { threshold: 100, message: "Awesome! 100 points!", type: "success" },
      { threshold: 250, message: "Incredible! 250 points!", type: "success" },
    ];

    scoreThresholds.forEach(({ threshold, message, type }) => {
      if (score >= threshold && !triggeredScoreThresholds.current.has(threshold)) {
        ToastService.show(type, message);
        triggeredScoreThresholds.current.add(threshold);
      }
    });

    return () => {
      if (scoreTimerId.current) {
        clearInterval(scoreTimerId.current);
        scoreTimerId.current = null;
      }
    };
  }, [score, gameOver, gameDifficulty]);

  useEffect(() => {
    if (gameOver) {
      setIsMoving({ left: false, right: false });
    }
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
        addScore,
        restartGame,
        gameDifficulty
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