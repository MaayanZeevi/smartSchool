import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import Header from "../../components/Header/Header";
import UserContext from "../../contexts/UserContext";
import ArrowWithLogo from "../../components/ArrowWithLogo/ArrowWithLogo";
import Sidebar from "../../components/Sidebar/Sidebar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { sendMessage } from "../../api/messages";
import SnackbarMessage from "../../components/SnackbarMessage/SnackbarMessage";

const MessageSend = ({ navigation }) => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined);

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleSidebarExit = () => {
    setSidebarVisible(false);
  };

  const { user } = useContext(UserContext);

  const handleSend = () => {
    setMessage("");
    setTo("");
    setSubject("");
    sendMessage(to, message, subject)
      .then(() => {
        setSuccessMessage("ההודעה נשלחה בהצלחה");
      })
      .catch(() => {
        setErrorMessage("שליחת ההודעה נכשלה");
      });
  };

  return (
    <View style={styles.container}>
      <Header
        title={"שליחת הודעה"}
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="אל"
          value={to}
          onChangeText={(text) => setTo(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={{ ...styles.input, color: "black" }}
          placeholder="מאת"
          value={`${user.firstName} ${user.lastName} (${user.userId})`}
          editable={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="נושא"
          value={subject}
          onChangeText={(text) => setSubject(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="הקלד הודעה כאן"
          value={message}
          onChangeText={(text) => setMessage(text)}
          multiline
        />
      </View>
      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Text style={styles.sendButtonText}>שלח</Text>
      </TouchableOpacity>
      <SnackbarMessage
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        setSuccessMessage={setSuccessMessage}
        successMessage={successMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  input: {
    height: 40,
    fontSize: 18,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  messageInput: {
    height: 200,
    textAlignVertical: "top",
  },
  sendButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 24,
    alignItems: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MessageSend;
