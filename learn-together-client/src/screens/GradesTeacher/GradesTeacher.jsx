import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/Header/Header";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { uploadGrade } from "../../api/grades";
import ArrowWithLogo from "../../components/ArrowWithLogo/ArrowWithLogo";
import Sidebar from "../../components/Sidebar/Sidebar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const GradesTeacher = ({ navigation }) => {
  const route = useRoute();

  const [rows, setRows] = useState(
    route.params.students.map((student) => ({
      id: student,
      grade: "100",
    }))
  );

  const handleGradeChange = (index, value) => {
    const newGrades = [...rows];
    newGrades[index].grade = value;
    setRows(newGrades);
  };
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleSidebarExit = () => {
    setSidebarVisible(false);
  };

  return (
    <View style={styles.container}>
      {sidebarVisible && (
        <Sidebar handleExit={handleSidebarExit} navigation={navigation} />
      )}
      <Header
        title={"ציונים"}
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
        <View style={styles.table}>
          <View style={[styles.row, styles.headerRow]}>
            <Text style={[styles.cell, styles.headerCell]}>הזן ציון</Text>
            <Text style={[styles.cell, styles.headerCell]}>תעודת זהות</Text>
          </View>
          {rows.map((grade, index) => (
            <View
              key={index}
              style={[styles.row, index % 2 === 1 && styles.oddRow]}
            >
              <TextInput
                style={styles.cell}
                value={grade.grade}
                onChangeText={(value) => handleGradeChange(index, value)}
                keyboardType="numeric"
              />
              <Text style={styles.cell}>{grade.id}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity
          onPress={() => {
            for (let index = 0; index < rows.length; index++) {
              const element = rows[index];
              uploadGrade(
                route.params.description,
                parseInt(element.grade),
                route.params.startDate,
                element.id,
                route.params.type
              ).catch((err) => console.log(err));
            }
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>עדכן ציונים</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F9F9",
  },
  table: {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    backgroundColor: "#48CDCA",
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: "center",
    color: "#333",
  },
  headerRow: {
    backgroundColor: "#E8F9F9",
  },
  headerCell: {
    fontWeight: "bold",
  },
  oddRow: {
    backgroundColor: "#86DCDD",
  },
  button: {
    backgroundColor: "#48CDCA",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: "center",
    marginTop: 24,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default GradesTeacher;
