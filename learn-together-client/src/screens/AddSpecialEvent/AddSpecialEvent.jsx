import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/Header/Header";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { createTest } from "../../api/tests";
import { getAllClassesNames, getStudentsInClass } from "../../api/class";
import { ScrollView } from "react-native";
import { beautifyDate, beautifyTime } from "../../utils/date";
import { addSpecialDate } from "../../api/specialDates";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ArrowWithLogo from "../../components/ArrowWithLogo/ArrowWithLogo";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Snackbar } from "react-native-paper";
import SnackbarMessage from "../../components/SnackbarMessage/SnackbarMessage";

const AddSpecialEvent = ({ navigation }) => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [name, setName] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [combinedTime, setCombinedTime] = useState(new Date());
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined);

  const handleSubmit = () => {
    getStudentsInClass(selectedClass)
      .then((students) => {
        addSpecialDate(
          name,
          beautifyDate(combinedTime),
          beautifyTime(combinedTime),
          students.data.map((student) => student.id)
        )
          .then(() => {
            setSuccessMessage("האירוע נוסף בהצלחה");
            setName("");
          })
          .catch((err) => {
            console.log(err);
            setErrorMessage("הוספת האירוע נכשלה");
          });
      })
      .catch((err) => console.log(err));
  };

  const handleSidebarExit = () => {
    setSidebarVisible(false);
  };

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime;
    setShowTimePicker(false);
    setSelectedTime(currentTime);
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const time = date.toLocaleTimeString();
    return `${day}/${month}/${year} ${time}`;
  };

  useEffect(() => {
    getAllClassesNames()
      .then((res) => {
        setClasses(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      selectedTime.getHours(),
      selectedTime.getMinutes()
    );
    setCombinedTime(newDate);
  }, [selectedDate, selectedTime]);

  return (
    <View style={styles.container}>
      {sidebarVisible && (
        <Sidebar handleExit={handleSidebarExit} navigation={navigation} />
      )}
      <Header
        title={"הוספת אירוע מיוחד"}
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
        <View style={styles.form}>
          <Text style={styles.label}>שם:</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleNameChange}
            value={name}
          />
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => {
              setShowDatePicker(true);
            }}
          >
            <Text style={styles.dateButtonText}>תאריך</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode={"date"}
              onChange={handleDateChange}
            />
          )}

          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => {
              setShowTimePicker(true);
            }}
          >
            <Text style={styles.dateButtonText}>זמן</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={new Date()}
              mode={"time"}
              onChange={handleTimeChange}
            />
          )}

          <Text style={styles.label}>כיתות:</Text>
          <Picker
            selectedValue={selectedClass}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedClass(itemValue);
            }}
          >
            <Picker.Item key={"-"} label={"-"} value={null} />
            {classes.map((c) => (
              <Picker.Item key={c} label={c} value={c} />
            ))}
          </Picker>

          <Text style={styles.selectedDates}>
            תאריך: {formatDate(combinedTime)}
          </Text>

          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>הוספת אירוע</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    backgroundColor: "#f2f2f2",
  },
  alert: {
    position: "absolute",
    bottom: 0,
    textAlign: "right",
  },
  form: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  dateButton: {
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  dateButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  selectedDates: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default AddSpecialEvent;
