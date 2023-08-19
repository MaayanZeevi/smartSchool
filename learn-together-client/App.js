import { SafeAreaProvider } from "react-native-safe-area-context";

import AppNavigator from "./src/AppNavigator";
import { I18nManager } from "react-native";
import { LogBox } from "react-native";

export default function App() {
  I18nManager.forceRTL(false);
  I18nManager.allowRTL(false);
  I18nManager.isRTL = false;

  LogBox.ignoreAllLogs();

  return (
    // <SafeAreaProvider>
    <AppNavigator />
    // </SafeAreaProvider>
  );
}
