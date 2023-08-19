import { Image } from "react-native";
import { View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import logo from "../../../assets/smart-school-logo.jpg";

const ArrowWithLogo = ({ navigation }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <View style={{ aspectRatio: 347 / 213, backgroundColor: "red" }}>
        <Image
          style={{
            width: "100%",
            height: "100%",
          }}
          source={logo}
        />
      </View>
      <MaterialCommunityIcons
        onPress={() => navigation.goBack()}
        name="arrow-right"
        size={30}
      />
    </View>
  );
};

export default ArrowWithLogo;
