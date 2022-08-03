import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function LoadingOverlay({ message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
  },
});
