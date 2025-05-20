import { Dimensions } from "react-native";
import { storage } from "../../../../../../src/utils/storage";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const CIRCLE_SIZE = 60;
export const BOTTOM_MARGIN = 30;
export const MOVEMENT_SPEED = 28;

export const objectTypes = ["circle", "square", "triangle"];
export const objectColors = ["#ff6b6b", "#4ecdc4", "#ffbe0b", "#fb5607", "#8338ec"];

const difficultyProbabilities = {
  easy: 0.05,
  medium: 0.10,
  hard: 0.20,
};

const MIN_LARGE_SIZE = screenWidth * 0.1;
const MAX_LARGE_SIZE = screenWidth * 0.2;
const NORMAL_MIN_SIZE = 20;
const NORMAL_MAX_SIZE = 59;

export { screenWidth, screenHeight };

export const generateRandomObject = (objectCount) => {
  let size;

  const difficulty = storage.getString('difficulty') || 'medium';
  const largeSizeProbability = difficultyProbabilities[difficulty] || difficultyProbabilities.medium;

  if (Math.random() < largeSizeProbability) {
    size = Math.random() * (MAX_LARGE_SIZE - MIN_LARGE_SIZE) + MIN_LARGE_SIZE;
    size = Math.floor(size);
    if (size < MIN_LARGE_SIZE) size = Math.floor(MIN_LARGE_SIZE);
  } else {
    size = Math.floor(Math.random() * (NORMAL_MAX_SIZE - NORMAL_MIN_SIZE + 1)) + NORMAL_MIN_SIZE;
  }

  if (size > screenWidth) size = screenWidth;
  if (size < NORMAL_MIN_SIZE) size = NORMAL_MIN_SIZE;

  const type = objectTypes[Math.floor(Math.random() * objectTypes.length)];

  const x = Math.random() * Math.max(0, screenWidth - size);

  const opacity = 1.0;
  const speed = Math.random() * 3 + 25;

  const color = objectColors[Math.floor(Math.random() * objectColors.length)];

  return {
    id: `object-${objectCount}`,
    position: { x, y: -size },
    size,
    type,
    color,
    opacity,
    speed,
  };
};