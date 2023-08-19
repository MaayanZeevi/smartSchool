import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import Header from "../../components/Header/Header";
import ArrowWithLogo from "../../components/ArrowWithLogo/ArrowWithLogo";
import { TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { getCurrentLesson, openClass } from "../../api/attendance";
import * as Location from "expo-location";
import LoadingCircle from "../../components/LoadingCircle/LoadingCircle";
import Sidebar from "../../components/Sidebar/Sidebar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const OpenQR = ({ navigation }) => {
  const [currentLesson, setCurrentLesson] = useState(null);
  const [pressed, setPressed] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleSidebarExit = () => {
    setSidebarVisible(false);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("not get location");
        // setErrorMsg("Permission to access location was denied");
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
      .catch((err) => {
        console.log(err);
        setError("התרחשה שגיאה, ייתכן כי אין כרגע שיעור במערכת");
        setPressed(false);
      })
      .finally(() => setLoading(false));
  }, []);

  const handlePress = () => {
    console.log(location);
    openClass(location)
      .then(() => {
        console.log("good");
      })
      .catch(() => console.log("bad"))
      .finally(() => setPressed(true));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F2F9F5",
      }}
    >
      {sidebarVisible && (
        <Sidebar handleExit={handleSidebarExit} navigation={navigation} />
      )}
      <Header
        title={"פתיחת נוכחות"}
        rightIcon={<ArrowWithLogo navigation={navigation} />}
        leftIcon={
          <MaterialCommunityIcons
            onPress={() => setSidebarVisible(true)}
            name="menu"
            size={30}
          />
        }
        containerStyle={{ backgroundColor: "#198A8C" }}
      />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <LoadingCircle loading={loading} />

        {!pressed && !loading && currentLesson && !currentLesson.location && (
          <TouchableOpacity
            onPress={handlePress}
            style={{
              backgroundColor: "#198A8C",
              padding: 20,
              borderRadius: 10,
              width: 150,
              alignSelf: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 18, textAlign: "center" }}>
              פתח נוכחות
            </Text>
            <MaterialCommunityIcons
              style={{ color: "white", alignSelf: "center", marginTop: 10 }}
              name="check"
              size={50}
            />
          </TouchableOpacity>
        )}
        {error && <Text style={styles.noLessonsText}>{error}</Text>}
        {((currentLesson && pressed) ||
          (currentLesson && currentLesson.location)) && (
          <View style={styles.qrContainer}>
            <MaterialCommunityIcons
              style={{ color: "green", alignSelf: "center", marginTop: 20 }}
              name="check-circle"
              size={100}
            />
            <Text style={{ fontSize: 18, textAlign: "center" }}>
              השיעור נפתח לנוכחות
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  noLessonsText: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "#666",
    marginTop: 20,
  },
  qrContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OpenQR;
