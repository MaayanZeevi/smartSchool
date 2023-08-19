import { View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const InformationText = ({ children }) => {
  return (
    <View style={{ position: "absolute", top: "40%", alignItems: "center" }}>
      <MaterialCommunityIcons name="information-outline" size={100} />
      {children}
    </View>
  );
};

export default InformationText;
