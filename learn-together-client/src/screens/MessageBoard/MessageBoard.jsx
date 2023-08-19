import { Text } from "react-native";
import { View } from "react-native";
import Header from "../../components/Header/Header";
import Message from "../../components/Message/Message";
import { useContext, useState } from "react";
import { getMessages, getOutMessages } from "../../api/messages";
import ArrowWithLogo from "../../components/ArrowWithLogo/ArrowWithLogo";
import { useEffect } from "react";
import LoadingCircle from "../../components/LoadingCircle/LoadingCircle";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Button } from "@rneui/themed";
import PlusButton from "../../components/PlusButton/PlusButton";
import UserContext from "../../contexts/UserContext";

const MessageBoard = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user.role === "teacher") {
      getOutMessages()
        .then((messages) => {
          setMessages(messages.data);
        })
        .finally(() => setLoading(false));
    } else {
      getMessages()
        .then((messages) => {
          setMessages(messages.data);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleSidebarExit = () => {
    setSidebarVisible(false);
  };

  const handleMessagePress = (messageProps) => {
    navigation.navigate("MessageView", {
      ...messageProps,
    });
  };

  const handlePress = () => {
    navigation.navigate("MessageSend");
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={"הודעות"}
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
      <LoadingCircle loading={loading} />
      <ScrollView>
        <View style={{ paddingBottom: 20 }}>
          {messages.map((message, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleMessagePress(message)}
            >
              <Message {...message} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {user.role === "teacher" && <PlusButton handlePress={handlePress} />}
    </View>
  );
};

export default MessageBoard;
