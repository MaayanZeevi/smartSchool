import { View } from "react-native";
import Header from "../../components/Header/Header";
import ArrowWithLogo from "../../components/ArrowWithLogo/ArrowWithLogo";
import { Text } from "react-native";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { useRoute } from "@react-navigation/native";
import Sidebar from "../../components/Sidebar/Sidebar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";

const PersonalDetails = ({ navigation }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleSidebarExit = () => {
    setSidebarVisible(false);
  };
  const { user } = useContext(UserContext);
  const route = useRoute();
  const userParams = route.params;
  const chosenUser = userParams ? userParams : user;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F2F9F5",
        paddingTop: 20,
        paddingBottom: 10,
      }}
    >
      {sidebarVisible && (
        <Sidebar handleExit={handleSidebarExit} navigation={navigation} />
      )}
      <Header
        title={"פרטי משתמש"}
        rightIcon={<ArrowWithLogo navigation={navigation} />}
        leftIcon={
          <MaterialCommunityIcons
            onPress={() => setSidebarVisible(true)}
            name="menu"
            size={30}
          />
        }
      />
      <View style={{ paddingHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginVertical: 10,
            fontFamily: "Roboto",
            color: "black",
          }}
        >
          שם פרטי: {chosenUser.firstName}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginVertical: 10,
            fontFamily: "Roboto",
            color: "black",
          }}
        >
          שם משפחה: {chosenUser.lastName}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginVertical: 10,
            fontFamily: "Roboto",
            color: "gray",
          }}
        >
          כיתה: {chosenUser.classDetails}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginVertical: 10,
            fontFamily: "Roboto",
            color: "gray",
          }}
        >
          דוא"ל: {chosenUser.email}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginVertical: 10,
            fontFamily: "Roboto",
            color: "gray",
          }}
        >
          פלאפון: {chosenUser.phoneNumber}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginVertical: 10,
            fontFamily: "Roboto",
            color: "gray",
          }}
        >
          כתובת: {chosenUser.address}
        </Text>
      </View>
    </View>
  );
};

export default PersonalDetails;
