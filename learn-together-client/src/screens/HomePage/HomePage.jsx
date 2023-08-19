import { Text, View, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FlatGrid } from "react-native-super-grid";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { TouchableOpacity } from "react-native";
import Header from "../../components/Header/Header";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const HomePage = ({ navigation }) => {
  const optionsList = [
    {
      title: "מערכת שעות",
      icon: <MaterialCommunityIcons name="calendar-clock" size={50} />,
      navigate: () => {
        navigation.navigate("Schedule");
      },
      color: "#FFC1BD",
      roles: ["student", "teacher"],
    },
    {
      title: "הודעות",
      icon: <MaterialCommunityIcons name="message" size={50} />,
      navigate: () => {
        navigation.navigate("MessageBoard");
      },
      color: "#FFC1BD",
      roles: ["student", "parent", "teacher"],
    },
    {
      title: 'ש"ב',
      icon: <MaterialCommunityIcons name="book-outline" size={50} />,
      navigate: () => {
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
        navigation.navigate("ReportingPresence");
      },
      color: "#FFC1BD",
      roles: ["student", "parent"],
    },
    {
      title: "התנהגות",
      icon: <MaterialCommunityIcons name="emoticon-angry" size={50} />,
      navigate: () => {
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
        navigation.navigate("PersonalDetails");
      },
    },
    {
      title: "ציונים",
      icon: <MaterialCommunityIcons name="star" size={50} />,
      navigate: () => {
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
        navigation.navigate("StudentsCards");
      },
      color: "#FFC1BD",
      roles: ["teacher"],
    },
    {
      title: "פתיחת דיווח נוכחות",
      icon: <MaterialCommunityIcons name="qrcode" size={50} />,
      navigate: () => {
        navigation.navigate("OpenQR");
      },
      color: "#FFC1BD",
      roles: ["teacher"],
    },
  ];

  const handleLogout = () => {
    logout();
    navigation.navigate("LoginScreen");
  };

  const { user, logout, changeUser } = useContext(UserContext);

  return (
    <>
      {user.role !== "parent" ? (
        <View style={styles.pageContainer}>
          <Header
            leftIcon={
              <MaterialCommunityIcons
                onPress={handleLogout}
                name="logout"
                size={30}
              />
            }
            title={user ? `בוקר טוב ${user.firstName}` : ""}
            navigation={navigation}
            style={styles.header}
          />

          <FlatGrid
            itemDimension={100}
            data={optionsList.filter((option) =>
              option.roles.includes(user.role)
            )}
            spacing={20}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={item.navigate}
                  style={[styles.gridItem, { backgroundColor: item.color }]}
                >
                  <View style={styles.gridItemIcon}>{item.icon}</View>
                  <Text style={styles.gridItemTitle}>{item.title}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={{ fontSize: 20, paddingBottom: 20 }}>
            בחר/י בבקשה משתמש תלמיד
          </Text>
          {user.children.map((child, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.childButton}
                onPress={() => changeUser(child.userId)}
              >
                <Text style={styles.childName}>{child.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "white",
    display: "flex",
  },
  header: {
    paddingVertical: 10,
  },
  gridItem: {
    borderRadius: 10,
    width: 110,
    height: 110,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    display: "flex",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gridItemIcon: {
    marginBottom: 10,
  },
  gridItemTitle: {
    color: "#6D6E6C",
    fontSize: 14,
    textAlign: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  childButton: {
    backgroundColor: "#007ACC",
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  childName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomePage;
