import React, { useContext, useEffect, useState } from "react";
import { Alert, ActivityIndicator, StyleSheet, UIManager } from "react-native";
import WeekView from "react-native-week-view";
import { getSchedule } from "../../api/attendance";
import {
  getDateFromString,
  getDayEnglishToNumber,
  getDaysBetweenDates,
  getStartOfWeek,
} from "../../utils/date";
import { generateId } from "../../utils/id";
import { View } from "react-native";
import Header from "../../components/Header/Header";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, Overlay, Icon } from "@rneui/themed";
import UserContext from "../../contexts/UserContext";
import Sidebar from "../../components/Sidebar/Sidebar";
import ArrowWithLogo from "../../components/ArrowWithLogo/ArrowWithLogo";
import { getMyTests } from "../../api/tests";

export default function Schedule({ navigation }) {
  const [events, setEvents] = useState([]);
  const [numberOfDays, setNumberOfDays] = useState(7);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const { user } = useContext(UserContext);

  const toggleOverlay = (event) => {
    setVisible(event);
  };

  useEffect(() => {
    Promise.all([getMyTests(), getSchedule()]) // Use Promise.all to fetch data in parallel
      .then(([testsRes, scheduleRes]) => {
        const testsEvents = testsRes.data.map((test) => {
          return {
            id: generateId(),
            startDate: new Date(test.startDate),
            endDate: new Date(test.endDate),
            color: "red",
            description: test.subject,
            students: test.students,
            type: test.type,
          };
        });
        const scheduleEvents = scheduleRes
          .map((lesson) => {
            return getDaysBetweenDates(
              getDayEnglishToNumber(lesson.day),
              lesson.startDate,
              lesson.endDate
            ).map((date) => ({
              id: generateId(),
              startDate: getDateFromString(date, lesson.startTime),
              endDate: getDateFromString(date, lesson.endTime),
              color: "blue",
              description: lesson.subject,
              className: lesson.class,
            }));
          })
          .flat();
        setEvents([...testsEvents, ...scheduleEvents]);
        setIsLoading(false); // Set isLoading to false when data is fetched
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false); // Set isLoading to false on error
        Alert.alert("Error", "Failed to fetch data");
      });
  }, []);

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleSidebarExit = () => {
    setSidebarVisible(false);
  };

  if (isLoading) {
    // Render loading indicator while isLoading is true
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="מערכת שעות"
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
      <WeekView
        events={events}
        selectedDate={getStartOfWeek()}
        numberOfDays={numberOfDays}
        maxToRenderPerBatch={15}
        initialNumToRender={50}
        eventTextStyle={{ fontSize: 12 }}
        onEventPress={(event) => {
          toggleOverlay(event);
        }}
      />
      {user.role === "teacher" && (
        <Overlay
          isVisible={Boolean(visible)}
          onBackdropPress={() => toggleOverlay(undefined)}
        >
          {visible && visible.color === "blue" ? (
            <View style={{ display: "flex", gap: 5 }}>
              <Button
                title="הזנת שיעורי בית"
                onPress={() => {
                  toggleOverlay();
                  navigation.navigate("HomeworkTeacher", {
                    ...visible,
                  });
                }}
              />
              <Button
                title="נוכחות והתנהגות"
                onPress={() => {
                  toggleOverlay();
                  navigation.navigate("ReportTeacher", { ...visible });
                }}
              />
            </View>
          ) : visible && visible.color === "red" ? (
            <Button
              title="הזנת ציונים"
              onPress={() => {
                toggleOverlay();
                navigation.navigate("GradesTeacher", { ...visible });
              }}
            />
          ) : null}
        </Overlay>
      )}

      <TouchableOpacity
        style={{
          backgroundColor: "#198A8C",
          position: "absolute",
          bottom: 10,
          right: 10,
          zIndex: 1,
          borderRadius: 50,
          width: 100,
          height: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
        onPress={() => {
          setNumberOfDays(numberOfDays === 7 ? 1 : 7);
        }}
      >
        <MaterialCommunityIcons
          name={numberOfDays === 7 ? "calendar-outline" : "calendar-week-begin"}
          size={40}
          color="#fff"
        />
        <Text style={{ color: "#fff", fontSize: 16, marginTop: 5 }}>
          {numberOfDays === 7 ? "יום" : "שבוע"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
