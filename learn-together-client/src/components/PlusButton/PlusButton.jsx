import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const PlusButton = ({ handlePress }) => {
  return (
    <TouchableOpacity style={[styles.sendMessageButton]} onPress={handlePress}>
      <MaterialCommunityIcons name="plus-circle" size={50} color="white" />
    </TouchableOpacity>
  );
};

const styles = {
  sendMessageButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    borderRadius: 50,
    padding: 10,
    backgroundColor: "#287B9A",
  },
};

export default PlusButton;
