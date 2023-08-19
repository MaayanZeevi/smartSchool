import { View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Header from "../../components/Header/Header";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { useEffect } from "react";
import { getCurrentLesson, markInClass } from "../../api/attendance";
import { useState } from "react";
import * as Location from "expo-location";
import LoadingCircle from "../../components/LoadingCircle/LoadingCircle";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { Snackbar } from "react-native-paper";
import ArrowWithLogo from "../../components/ArrowWithLogo/ArrowWithLogo";
import Sidebar from "../../components/Sidebar/Sidebar";

const ReportingPresence = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [success, setSuccess] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(undefined);
  const { user } = useContext(UserContext);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    getCurrentLesson()
      .then((res) => {
        setCurrentLesson(res);
      })
      .catch(() => {
        setCurrentLesson(null);
      });
  }, []);

  const handlePress = () => {
    markInClass(user.userId, currentLesson.subject, location)
      .then(() => {
        if (!location) throw new Error("Location not found");
        setSuccess(true);
      })
      .catch(() => {
        setErrorMsg("התרחשה שגיאה, ייתכן כי אינך נמצא בשיעור");
      });
  };

  const handleSidebarExit = () => {
    setSidebarVisible(false);
  };

  return (
    <View style={styles.container}>
      <Header
        title={"רישום נוכחות"}
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
      <View style={styles.content}>
        {currentLesson === null ? (
          <View>
            <MaterialCommunityIcons
              style={styles.icon}
              name="information-outline"
              size={100}
            />
            <Text style={styles.message}>לא נמצא שיעור פתוח לדיווח נוכחות</Text>
          </View>
        ) : currentLesson === undefined ? (
          <LoadingCircle loading={true} />
        ) : (
          <View>
            <MaterialCommunityIcons
              color={success ? "green" : "gray"}
              size={100}
              name="check-circle"
              style={styles.icon}
              onPress={handlePress}
            />
            <Text style={styles.message}>לחץ על הכפתור לרשימת נוכחות</Text>
          </View>
        )}
      </View>
      <Snackbar
        visible={errorMsg}
        duration={6000}
        onDismiss={() => setErrorMsg(null)}
        style={{ ...styles.alert, backgroundColor: "red" }}
      >
        {errorMsg}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 16,
    color: "#757575",
    textAlign: "center",
    marginHorizontal: 32,
  },
  icon: {
    alignSelf: "center",
    marginBottom: 20,
  },
});

export default ReportingPresence;
