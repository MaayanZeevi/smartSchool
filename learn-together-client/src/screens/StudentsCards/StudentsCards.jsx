import { ScrollView, TouchableOpacity, View } from "react-native";
import Header from "../../components/Header/Header";
import ArrowWithLogo from "../../components/ArrowWithLogo/ArrowWithLogo";
import { Text } from "react-native";
import { Input } from "@rneui/base";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import { searchStudent } from "../../api/search";
import { useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const StudentsCards = ({ navigation }) => {
  const [inputValue, setInputValue] = useState("");
  const [students, setStudents] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleSidebarExit = () => {
    setSidebarVisible(false);
  };

  return (
    <>
      <Header
        title={"איתור תלמיד"}
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
      <View style={styles.container}>
        <Text style={styles.title}>איתור תלמיד</Text>
        <Text style={styles.subtitle}>
          נא להקליד את שם התלמיד ולחץ על "חיפוש"
        </Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>לידיעתך!</Text>
          <Text style={styles.infoText}>
            ניתן לאתר תלמיד באמצעות שם פרטי או משפחה, מספר טלפון או כתובת דוא"ל
            של התלמיד או אחד ההורים.
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder="שם התלמיד"
            value={inputValue}
            onChangeText={(event) => setInputValue(event)}
            inputStyle={styles.input}
            containerStyle={styles.inputWrapper}
          />
          <Button
            onPress={() =>
              searchStudent(inputValue)
                .then((res) => setStudents(res))
                .catch(() => setStudents([]))
            }
            raised
            buttonStyle={{
              backgroundColor: "white",
              borderWidth: 2,
              borderRadius: 30,
              borderColor: "white",
            }}
            containerStyle={{ borderRadius: 30, height: 44 }}
            title="חיפוש"
            titleStyle={{ color: "black" }}
          />
        </View>
        <ScrollView>
          {students.map((student, index) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("PersonalDetails", student)}
              key={index}
            >
              <View style={styles.card}>
                <Text style={styles.name}>
                  {student.firstName} {student.lastName}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Roboto",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: "Roboto",
    color: "#A5A5A5",
    marginBottom: 10,
  },
  infoContainer: {
    backgroundColor: "#AEEEEE",
    marginBottom: 20,
    borderRadius: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
    padding: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#333",
    marginBottom: 3,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 14,
    fontFamily: "Roboto",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row-reverse",
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    textAlign: "right",
    color: "#333",
  },
  button: {
    borderRadius: 10,
    color: "#000",
  },

  card: {
    backgroundColor: "#AEEEEE",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default StudentsCards;
