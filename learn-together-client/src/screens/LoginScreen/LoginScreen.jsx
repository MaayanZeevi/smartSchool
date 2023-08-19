import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { Input } from "@rneui/base";
import { Snackbar } from "react-native-paper";

import logo from "../../../assets/smart-school-logo.jpg";
// import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

const LoginScreen = ({ navigation }) => {
  const [pickedRolesIndex, setPickedRolesIndex] = useState(null);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorSnackbar, setErrorSnackbar] = useState(null);
  const { login } = useContext(UserContext);

  const handleRoleChange = (index) => {
    setPickedRolesIndex(index);
  };

  const handleLogin = () => {
    if (id === "" || password === "") {
      setErrorSnackbar("מייל או סיסמא לא הוזנו במערכת");
      return;
    }

    if (pickedRolesIndex === null || pickedRolesIndex === undefined) {
      setErrorSnackbar("לא נבחר סוג משתמש");
      return;
    }

    login(id, password, pickedRolesIndex)
      .then(() => {
        navigation.navigate("HomeScreen");
      })
      .catch((error) => setErrorSnackbar(error.message));
  };

  const usersRoles = ["הורים", "מורים", "תלמידים"];

  return (
    <KeyboardAvoidingView
      style={styles.pageContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image style={styles.logo} source={logo} />
      <View style={styles.rolesContainer}>
        {usersRoles.map((role, index) => (
          <TouchableOpacity
            onPress={() => handleRoleChange(index)}
            key={index}
            style={{
              ...styles.roleContainer,
              backgroundColor: index === pickedRolesIndex ? "aqua" : "#47CCD0",
            }}
          >
            <Text style={styles.roleText}>{role}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.welcomeTitle}>ברוכים הבאים</Text>

      <Input
        keyboardType="numeric"
        rightIcon={<FontAwesome name="user" size={25} />}
        placeholder="תעודת זהות"
        value={id}
        onChangeText={(event) => setId(event)}
        style={{ marginRight: 10 }}
        inputStyle={{ textAlign: "right" }}
      />
      <Input
        rightIcon={<FontAwesome name="lock" size={25} />}
        placeholder="סיסמא"
        value={password}
        onChangeText={(event) => setPassword(event)}
        secureTextEntry={true}
        inputStyle={{ textAlign: "right" }}
        style={{ marginRight: 10 }}
      />

      <Text
        onPress={() => navigation.navigate("ForgotPassword")}
        style={styles.forgotPassword}
      >
        שכחת סיסמא?
      </Text>
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>התחברות</Text>
      </TouchableOpacity>
      <Snackbar
        visible={errorSnackbar}
        onDismiss={() => setErrorSnackbar(null)}
        duration={6000}
        style={styles.errorSnackbar}
      >
        {errorSnackbar}
      </Snackbar>
      <View style={{ flex: 1 }} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logo: {
    width: "70%",
    resizeMode: "contain",
  },
  rolesContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  roleContainer: {
    height: 50,
    width: 105,
    borderRadius: 15,
  },
  roleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlignVertical: "center",
    textAlign: "center",
    height: "100%",
  },
  welcomeTitle: {
    fontSize: 30,
    marginTop: 35,
    marginBottom: 10,
  },
  forgotPassword: {
    alignSelf: "flex-start",
    marginLeft: 40,
    fontWeight: "bold",
    fontSize: 17,
  },
  loginButton: {
    width: "95%",
    backgroundColor: "#47CCD0",
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  loginButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
  },
  errorSnackbar: {
    backgroundColor: "red",
  },
});

export default LoginScreen;
