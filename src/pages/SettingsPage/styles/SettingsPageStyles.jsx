import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
    marginBottom: 70, // Space for back button
  },
  settingsContainer: {
    width: '100%',
    paddingHorizontal: 10,
  }
});