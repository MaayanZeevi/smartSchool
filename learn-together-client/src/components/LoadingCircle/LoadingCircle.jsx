import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const LoadingCircle = ({ loading }) => {
  return loading ? (
    <ActivityIndicator style={styles.loadingCircle} size="large" />
  ) : undefined;
};

const styles = StyleSheet.create({
  loadingCircle: {
    marginTop: 10,
  },
});

export default LoadingCircle;
