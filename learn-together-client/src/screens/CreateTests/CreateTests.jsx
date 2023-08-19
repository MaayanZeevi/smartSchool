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
import ArrowWithLogo from "../../components/ArrowWithLogo/ArrowWithLogo";
import Sidebar from "../../components/Sidebar/Sidebar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SnackbarMessage from "../../components/SnackbarMessage/SnackbarMessage";

const CreateTests = ({ navigation }) => {
  const [subject, setSubject] = useState("");
  const [startDate, setStartDate] = useState({
    startDay: new Date(),
    startTime: new Date(),
  });
  const [endDate, setEndDate] = useState({
    startDay: new Date(),
    startTime: new Date(),
  });
  const [moed, setMoed] = useState(1);
  const [showStartTimeDatePicker, setShowStartTimeDatePicker] = useState(false);
  const [showEndTimeDatePicker, setShowEndTimeDatePicker] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState("date");
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [type, setType] = useState("מבחן");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined);

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleSidebarExit = () => {
    setSidebarVisible(false);
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
      startDate.startDay.getFullYear(),
      startDate.startDay.getMonth(),
      startDate.startDay.getDate(),
      startDate.startTime.getHours(),
      startDate.startTime.getMinutes()
    );
    setSelectedStartDate(newDate);
  }, [startDate]);

  useEffect(() => {
    const newDate = new Date(
      endDate.startDay.getFullYear(),
      endDate.startDay.getMonth(),
      endDate.startDay.getDate(),
      endDate.startTime.getHours(),
      endDate.startTime.getMinutes()
    );
    setSelectedEndDate(newDate);
  }, [endDate]);

  const handleSubjectChange = (text) => {
    setSubject(text);
  };

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    if (datePickerMode === "time") {
      setShowStartTimeDatePicker(false);
      setDatePickerMode("date");
      setStartDate((oldTime) => ({ ...oldTime, startTime: currentDate }));
    }
    if (datePickerMode === "date") {
      setDatePickerMode("time");
      setStartDate((oldTime) => ({ ...oldTime, startDay: currentDate }));
    }
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    if (datePickerMode === "time") {
      setShowEndTimeDatePicker(false);
      setDatePickerMode("date");
      setEndDate((oldTime) => ({ ...oldTime, startTime: currentDate }));
    }
    if (datePickerMode === "date") {
      setDatePickerMode("time");
      setEndDate((oldTime) => ({ ...oldTime, startDay: currentDate }));
    }
  };

  const handleSubmit = () => {
    getStudentsInClass(selectedClass)
      .then((students) => {
        createTest({
          subject,
          startDate: selectedStartDate,
          endDate: selectedEndDate,
          moed,
          students: students.data.map((student) => student.id),
          type,
        })
          .then(() => {
            setSubject("");
            setSuccessMessage("המבחן נוצר בהצלחה");
          })
          .catch(() => {
            setErrorMessage("יצירת המבחן נכשלה");
          });
      })
      .catch((err) => console.log(err));
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const time = date.toLocaleTimeString();
    return `${day}/${month}/${year} ${time}`;
  };

  return (
    <View style={styles.container}>
      <Header
        title={"יצירת מבחן"}
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

      <ScrollView>
        <View style={styles.form}>
          <Text style={styles.label}>מקצוע:</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleSubjectChange}
            value={subject}
          />
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => {
              setShowStartTimeDatePicker(true);
            }}
          >
            <Text style={styles.dateButtonText}>תאריך התחלה</Text>
          </TouchableOpacity>
          {showStartTimeDatePicker && (
            <DateTimePicker
              value={startDate.startDay}
              mode={datePickerMode}
              onChange={handleStartDateChange}
            />
          )}

          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => {
              setShowEndTimeDatePicker(true);
            }}
          >
            <Text style={styles.dateButtonText}>תאריך סיום</Text>
          </TouchableOpacity>
          {showEndTimeDatePicker && (
            <DateTimePicker
              value={endDate.startDay}
              mode={datePickerMode}
              onChange={handleEndDateChange}
            />
          )}

          <Text style={styles.label}>מועד:</Text>
          <Picker
            selectedValue={moed}
            onValueChange={(itemValue, itemIndex) => {
              setMoed(itemValue);
            }}
          >
            <Picker.Item label="1" value={1} />
            <Picker.Item label="2" value={2} />
            <Picker.Item label="3" value={3} />
          </Picker>

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

          <Text style={styles.label}>סוג:</Text>
          <Picker
            selectedValue={type}
            onValueChange={(itemValue, itemIndex) => {
              setType(itemValue);
            }}
          >
            <Picker.Item label={"מבחן"} value={"מבחן"} />
            <Picker.Item label={"בוחן"} value={"בוחן"} />
            <Picker.Item label={"עבודה"} value={"עבודה"} />
          </Picker>

          <Text style={styles.selectedDates}>
            תחילת מבחן: {formatDate(selectedStartDate)}
          </Text>
          <Text style={styles.selectedDates}>
            סיום מבחן: {formatDate(selectedEndDate)}
          </Text>

          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>יצירת מבחן</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <SnackbarMessage
        errorMessage={errorMessage}
        successMessage={successMessage}
        setErrorMessage={setErrorMessage}
        setSuccessMessage={setSuccessMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
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

export default CreateTests;
