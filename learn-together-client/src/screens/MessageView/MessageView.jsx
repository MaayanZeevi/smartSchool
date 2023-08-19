import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header/Header";
import ArrowWithLogo from "../../components/ArrowWithLogo/ArrowWithLogo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

const MessageView = ({ navigation }) => {
  const route = useRoute();

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleSidebarExit = () => {
    setSidebarVisible(false);
  };

  const { title, time, sender, date, content } = route.params;

  return (
    <View style={styles.container}>
      <Header
        title={title}
        rightIcon={<ArrowWithLogo navigation={navigation} />}
        leftIcon={
          <MaterialCommunityIcons
            onPress={() => setSidebarVisible(true)}
            name="menu"
            size={30}
          />
        }
      />
      {sidebarVisible && (
        <Sidebar handleExit={handleSidebarExit} navigation={navigation} />
      )}
      <View style={{ marginTop: 10, marginLeft: 10 }}>
        <Text style={styles.detailsText}>תאריך: {`${time} | ${date}`}</Text>
        <Text style={styles.detailsText}>שולח: {sender}</Text>
        <Text style={{ fontSize: 17, marginTop: 10, width: "90%" }}>
          {content}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1 },
  detailsText: {
    color: "#3ecfb9",
    fontWeight: "bold",
    fontSize: 15,
    marginRight: 10,
  },
});

export default MessageView;
