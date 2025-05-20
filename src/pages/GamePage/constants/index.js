import { Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const CIRCLE_SIZE = 60;
export const BOTTOM_MARGIN = 30;
export const MOVEMENT_SPEED = 28;

export const objectTypes = ["circle", "square", "triangle"];
export const objectColors = ["#ff6b6b", "#4ecdc4", "#ffbe0b", "#fb5607", "#8338ec"];
export const SCORE_ITEM_COLOR = "#ffd700";
export const SCORE_VALUE = 50; 
export const SCORE_ITEM_PROBABILITY = 0.9;


export { screenWidth, screenHeight };