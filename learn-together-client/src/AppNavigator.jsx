import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";

import HomePage from "./screens/HomePage/HomePage";
import ForgotPassword from "./screens/ForgotPassword/ForgotPassword";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import logo from "../assets/smart-school-logo.jpg";
import UserContext, { UserProvider } from "./contexts/UserContext";
import TestSchedule from "./screens/TestSchedule/TestSchedule";
import ReportingPresence from "./screens/ReportingPresence/ReportingPresence";
import Homework from "./screens/Homework/Homework";
import Grades from "./screens/Grades/Grades";
import MessageBoard from "./screens/MessageBoard/MessageBoard";
import SpecialDates from "./screens/SpecialDates/SpecialDates";
import Behavior from "./screens/Behavior/Behavior";
import Schedule from "./screens/Schedule/Schedule";
import MessageView from "./screens/MessageView/MessageView";
import StudentsCards from "./screens/StudentsCards/StudentsCards";
import HomeworkTeacher from "./screens/HomeworkTeacher/HomeworkTeacher";
import OpenQR from "./screens/OpenQR/OpenQR";
import PersonalDetails from "./screens/PersonalDetails/PersonalDetails";
import GradesTeacher from "./screens/GradesTeacher/GradesTeacher";
import CreateTests from "./screens/CreateTests/CreateTests";
import ReportTeacher from "./screens/ReportTeacher/ReportTeacher";
import MessageSend from "./screens/MessageSend/MessageSend";
import AddSpecialEvent from "./screens/AddSpecialEvent/AddSpecialEvent";
import { useContext } from "react";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            title: "",
            headerTransparent: true,
          }}
        >
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen
            options={{ headerShown: false }}
            name="HomeScreen"
            component={HomePage}
          />
          <Stack.Screen
            name="Homework"
            component={Homework}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Behavior"
            component={Behavior}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Schedule"
            component={Schedule}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Grades"
            component={Grades}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SpecialDates"
            component={SpecialDates}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="CreatingTests"
            component={CreateTests}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="MessageBoard"
            component={MessageBoard}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="GradesTeacher"
            component={GradesTeacher}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="MessageView"
            component={MessageView}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="TestSchedule"
            component={TestSchedule}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="ReportTeacher"
            component={ReportTeacher}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="ReportingPresence"
            component={ReportingPresence}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="MessageSend"
            component={MessageSend}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="StudentsCards"
            component={StudentsCards}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="AddSpecialEvent"
            component={AddSpecialEvent}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="OpenQR"
            component={OpenQR}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="PersonalDetails"
            component={PersonalDetails}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="HomeworkTeacher"
            component={HomeworkTeacher}
          />
          <Stack.Screen
            options={{
              headerRight: () => (
                <Image
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 10,
                    width: 100,
                    height: 100,
                  }}
                  source={logo}
                />
              ),
            }}
            name="ForgotPassword"
            component={ForgotPassword}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default AppNavigator;
