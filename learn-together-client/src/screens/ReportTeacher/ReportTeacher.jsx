import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import Header from "../../components/Header/Header";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { getStudentsInClass } from "../../api/class";
import { Text } from "react-native";
import { CheckBox, Button } from "@rneui/themed";
import { uploadBehavior } from "../../api/behavior";
import ArrowWithLogo from "../../components/ArrowWithLogo/ArrowWithLogo";
import Sidebar from "../../components/Sidebar/Sidebar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SnackbarMessage from "../../components/SnackbarMessage/SnackbarMessage";

const ReportTeacher = ({ navigation }) => {
  const route = useRoute();
  const [students, setStudents] = useState([]);
  const [checkBoxes, setCheckBoxes] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const handleSidebarExit = () => {
    setSidebarVisible(false);
  };

  useEffect(() => {
    getStudentsInClass(route.params.className)
      .then((res) => {
        setStudents(res.data.map((student) => student.name));
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setCheckBoxes(
      students.map((student) => ({
        student: student,
        interference: false,
        goodWord: false,
        late: false,
        absence: false,
        attendance: true,
      }))
    );
  }, [students]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title={"דיווח"}
        rightIcon={<ArrowWithLogo navigation={navigation} />}
        leftIcon={
          <MaterialCommunityIcons
            onPress={() => setSidebarVisible(true)}
            name="menu"
            size={30}
          />
        }
      />

      <ScrollView>
        {checkBoxes.map((checkbox, index) => (
          <View key={index} style={styles.studentContainer}>
            {/* This is the title (header) */}
            <Text style={styles.studentName}>{checkbox.student}</Text>
            <ScrollView horizontal>
              <View style={styles.checkboxContainer}>
                <CheckBox
                  title="חיסור"
                  containerStyle={styles.checkboxContainerStyle}
                  textStyle={styles.checkboxTextStyle}
                  checked={checkbox.absence}
                  onPress={() => {
                    const newCheckBoxes = [...checkBoxes];
                    checkbox.absence = !checkbox.absence;
                    setCheckBoxes(newCheckBoxes);
                  }}
                />
                <CheckBox
                  title="איחור"
                  containerStyle={styles.checkboxContainerStyle}
                  textStyle={styles.checkboxTextStyle}
                  checked={checkbox.late}
                  onPress={() => {
                    const newCheckBoxes = [...checkBoxes];
                    checkbox.late = !checkbox.late;
                    setCheckBoxes(newCheckBoxes);
                  }}
                />
                <CheckBox
                  title="מילה טובה"
                  containerStyle={styles.checkboxContainerStyle}
                  textStyle={styles.checkboxTextStyle}
                  checked={checkbox.goodWord}
                  onPress={() => {
                    const newCheckBoxes = [...checkBoxes];
                    checkbox.goodWord = !checkbox.goodWord;
                    setCheckBoxes(newCheckBoxes);
                  }}
                />
                <CheckBox
                  title="הפרעה"
                  containerStyle={styles.checkboxContainerStyle}
                  textStyle={styles.checkboxTextStyle}
                  checked={checkbox.interference}
                  onPress={() => {
                    const newCheckBoxes = [...checkBoxes];
                    checkbox.interference = !checkbox.interference;
                    setCheckBoxes(newCheckBoxes);
                  }}
                />
                <CheckBox
                  title="נוכחות"
                  containerStyle={styles.checkboxContainerStyle}
                  textStyle={styles.checkboxTextStyle}
                  checked={checkbox.attendance}
                  onPress={() => {
                    const newCheckBoxes = [...checkBoxes];
                    checkbox.attendance = !checkbox.attendance;
                    setCheckBoxes(newCheckBoxes);
                  }}
                />
              </View>
            </ScrollView>
          </View>
        ))}
        <Button
          onPress={() => {
            let hadProblem = false;
            for (let index = 0; index < checkBoxes.length; index++) {
              const element = checkBoxes[index];
              const keys = Object.keys(element);
              const values = Object.values(element);
              for (let j = 0; j < keys.length; j++) {
                const key = keys[j];
                const value = values[j];
                if (value === true) {
                  uploadBehavior(
                    key,
                    route.params.startDate,
                    element.student,
                    route.params.description
                  ).catch(() => {
                    hadProblem = true;
                    setErrorMessage("הייתה בעיה בהעלאת הדיווח");
                  });
                }
              }
            }
            if (!hadProblem) {
              setSuccessMessage("הדיווח נשלח בהצלחה");
            }
          }}
          title="שלח"
          buttonStyle={styles.submitButton}
          titleStyle={styles.submitButtonText}
        />
      </ScrollView>
      <SnackbarMessage
        errorMessage={errorMessage}
        successMessage={successMessage}
        setErrorMessage={setErrorMessage}
        setSuccessMessage={setSuccessMessage}
      />
      {sidebarVisible && (
        <Sidebar handleExit={handleSidebarExit} navigation={navigation} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  studentContainer: {
    marginBottom: 20,
  },
  studentName: {
    textAlign: "right",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkboxContainerStyle: {},
  checkboxTextStyle: {
    fontSize: 16,
    fontWeight: "normal",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ReportTeacher;
