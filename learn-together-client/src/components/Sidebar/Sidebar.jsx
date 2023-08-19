import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

const Sidebar = ({ handleExit, navigation }) => {
  const { user, logout } = useContext(UserContext);

  const sidebarOptions = [
    {
      title: "מערכת שעות",
      icon: <MaterialCommunityIcons name="calendar-clock" size={50} />,
      navigate: () => {
        handleExit();
        navigation.navigate("Schedule");
      },
      color: "#FFC1BD",
      roles: ["student", "teacher"],
    },
    {
      title: "הודעות",
      icon: <MaterialCommunityIcons name="message" size={50} />,
      navigate: () => {
        handleExit();
        navigation.navigate("MessageBoard");
      },
      color: "#FFC1BD",
      roles: ["student", "parent", "teacher"],
    },
    {
      title: 'ש"ב',
      icon: <MaterialCommunityIcons name="book-outline" size={50} />,
      navigate: () => {
        handleExit();
        user.role === "teacher"
          ? navigation.navigate("HomeworkTeacher")
          : navigation.navigate("Homework");
      },
      color: "#FFC1BD",
      roles: ["student", "parent"],
    },
    {
      title: "תאריכים מיוחדים",
      icon: <MaterialCommunityIcons name="calendar-star" size={50} />,
      navigate: () => {
        handleExit();
        user.role === "teacher"
          ? navigation.navigate("AddSpecialEvent")
          : navigation.navigate("SpecialDates");
      },
      color: "#FFC1BD",
      roles: ["student", "parent", "teacher"],
    },
    {
      title: "מבחנים",
      icon: <MaterialCommunityIcons name="school" size={50} />,
      navigate: () => {
        handleExit();
        user.role === "teacher"
          ? navigation.navigate("CreatingTests")
          : navigation.navigate("TestSchedule");
      },
      color: "#FFC1BD",
      roles: ["student", "parent", "teacher"],
    },
    {
      title: "נוכחות",
      icon: <MaterialCommunityIcons name="qrcode" size={50} />,
      navigate: () => {
        handleExit();
        navigation.navigate("ReportingPresence");
      },
      color: "#FFC1BD",
      roles: ["student", "parent"],
    },
    {
      title: "התנהגות",
      icon: <MaterialCommunityIcons name="emoticon-angry" size={50} />,
      navigate: () => {
        handleExit();
        navigation.navigate("Behavior");
      },
      color: "#FFC1BD",
      roles: ["student", "parent"],
    },
    {
      title: "פרטים אישיים",
      icon: <MaterialCommunityIcons name="card-account-details" size={50} />,
      color: "#FFC1BD",
      roles: ["student"],
      navigate: () => {
        handleExit();
        navigation.navigate("PersonalDetails");
      },
    },
    {
      title: "ציונים",
      icon: <MaterialCommunityIcons name="star" size={50} />,
      navigate: () => {
        handleExit();
        user.role === "teacher"
          ? navigation.navigate("GradesTeacher")
          : navigation.navigate("Grades");
      },
      color: "#FFC1BD",
      roles: ["student", "parent"],
    },
    {
      title: "כרטיסי תלמידים",
      icon: <FontAwesome name="users" size={50} />,
      navigate: () => {
        handleExit();
        navigation.navigate("StudentsCards");
      },
      color: "#FFC1BD",
      roles: ["teacher"],
    },
    {
      title: "פתיחת דיווח נוכחות",
      icon: <FontAwesome name="users" size={50} />,
      navigate: () => {
        handleExit();
        navigation.navigate("OpenQR");
      },
      color: "#FFC1BD",
      roles: ["teacher"],
    },
    // {
    //   title: "התנתק",
    //   icon: <MaterialCommunityIcons name="logout" size={50} />,
    //   navigate: () => {
    //     handleExit();
    //     logout();
    //   },
    //   roles: ["student", "parent", "teacher"],
    // },
  ];

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handleExit}
      style={styles.grayContainer}
    >
      <TouchableOpacity activeOpacity={1} style={styles.sidebarContainer}>
        {sidebarOptions
          .filter((option) => option.roles.includes(user.role))
          .map((option, index) => (
            <Text
              onPress={option.navigate}
              style={styles.optionText}
              key={index}
            >
              {option.title}
            </Text>
          ))}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionText: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 18,
    fontFamily: "Roboto",
    color: "#333",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  sidebarContainer: {
    paddingTop: 50,
    backgroundColor: "#fff",
    flex: 1,
    width: "50%",
  },
  grayContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    zIndex: 1,
  },
});

export default Sidebar;
