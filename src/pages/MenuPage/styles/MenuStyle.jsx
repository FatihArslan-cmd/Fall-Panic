import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
  },
  title: {
    fontSize: 42,
    fontFamily: 'Orbitron-ExtraBold',
    marginBottom: 50,
    color: COLORS.primary,
    letterSpacing: 2,
  },
  button: {
    marginVertical: 10,
    width: 300,
    borderRadius: 15,
    elevation: 3,
  },
  buttonText: {
    color: COLORS.white,
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