import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  settingsContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
  scrollContent: {
        flexGrow: 1,          // İçeriğin, ScrollView'in yüksekliğini doldurmasını sağlar (içerik kısa ise)
    justifyContent: 'center',
  },
});