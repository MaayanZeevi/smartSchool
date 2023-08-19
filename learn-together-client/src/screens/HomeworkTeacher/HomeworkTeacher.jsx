import { Text } from "react-native";
import { View } from "react-native";
import Header from "../../components/Header/Header";
import ArrowWithLogo from "../../components/ArrowWithLogo/ArrowWithLogo";
import { Button, Input } from "@rneui/themed";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { uploadHomework } from "../../api/homework";
import { useRoute } from "@react-navigation/native";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";
import Sidebar from "../../components/Sidebar/Sidebar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const HomeworkTeacher = ({ navigation }) => {
  const [classSubject, setClassSubject] = useState("");
  const [homework, setHomework] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user } = useContext(UserContext);

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleSidebarExit = () => {
    setSidebarVisible(false);
  };

  const route = useRoute();
  const lesson = route.params;

  const handleUploadHomework = () => {
    uploadHomework(classSubject, homework, lesson.className)
      .then(() => {
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {sidebarVisible && (
        <Sidebar handleExit={handleSidebarExit} navigation={navigation} />
      )}
      <Header
        title={"הזנת שיעורי בית"}
        rightIcon={<ArrowWithLogo navigation={navigation} />}
        leftIcon={
          <MaterialCommunityIcons
            onPress={() => setSidebarVisible(true)}
            name="menu"
            size={30}
          />
        }
        containerStyle={{ backgroundColor: "#198A8C" }}
        centerComponent={{
          text: "הזנת שיעורי בית",
          style: { color: "#fff", fontSize: 20 },
        }}
      />
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 10 }}>
          שם השיעור: {lesson.subject} {lesson.description} {lesson.className},{" "}
          {user.firstName} {user.lastName}, בתאריך{" "}
          {lesson.startDate.toLocaleDateString("en-GB")}
        </Text>
        <Input
          multiline={true}
          placeholder="נושא השיעור"
          containerStyle={{ marginBottom: 10 }}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          inputStyle={{ fontSize: 16 }}
          value={classSubject}
          onChangeText={(event) => setClassSubject(event)}
          leftIcon={<MaterialIcons name="subject" size={24} color="#198A8C" />}
        />
        <Input
          multiline={true}
          placeholder="הזן שיעורי בית"
          containerStyle={{ marginBottom: 10 }}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          inputStyle={{ fontSize: 16 }}
          value={homework}
          onChangeText={(event) => setHomework(event)}
          leftIcon={
            <MaterialIcons name="assignment" size={24} color="#198A8C" />
          }
        />
        <Button
          onPress={handleUploadHomework}
          buttonStyle={{
            backgroundColor: "#2AA3FF",
            borderRadius: 30,
            marginVertical: 10,
          }}
          containerStyle={{ alignSelf: "center", width: "80%" }}
          title="עדכן"
          titleStyle={{ color: "white", fontSize: 16 }}
          icon={
            <MaterialIcons
              style={{ marginLeft: 5 }}
              name="update"
              size={24}
              color="white"
            />
          }
          iconRight
        />
      </View>
      <Snackbar
        visible={success}
        onDismiss={() => setSuccess((oldShowSuccess) => !oldShowSuccess)}
        duration={6000}
        style={{ ...styles.alert, backgroundColor: "green" }}
      >
        שיעורי בית הועלו בהצלחה
      </Snackbar>
      <Snackbar
        visible={error}
        onDismiss={() => setError((oldShowError) => !oldShowError)}
        duration={6000}
        style={{ ...styles.alert, backgroundColor: "red" }}
      >
        העלת שיעורי בית נכשלה
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  alert: {
    position: "absolute",
    bottom: 0,
    textAlign: "right",
  },
});

export default HomeworkTeacher;
