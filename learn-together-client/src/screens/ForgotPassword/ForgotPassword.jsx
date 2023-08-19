import { Image, StyleSheet, View } from "react-native";
import { Text, Input, Icon, Button } from "@rneui/themed";
import { sendForgotPassword } from "../../api/password";
import { useEffect, useState } from "react";
import { ActivityIndicator, Snackbar } from "react-native-paper";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [canSend, setCanSend] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCanSend(email.includes("@") && email.includes(".") && email.length > 4);
  }, [email]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text h1={true} h1Style={styles.title}>
          שכחת סיסמא?
        </Text>
        <Text h1={true} h1Style={styles.title}>
          תוכל לאפס אותה בקלות
        </Text>
      </View>
      <Input
        rightIcon={<Icon name="mail" />}
        leftIcon={
          <Icon color={canSend ? "green" : "gray"} name="check-circle" />
        }
        placeholder="  כתובת מייל"
        containerStyle={styles.input}
        value={email}
        onChangeText={(event) => setEmail(event)}
        errorMessage={errorMessage}
      />
      {!loading ? (
        <Button
          disabled={!canSend}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          color="#4ACCCC"
          title="שלח"
          onPress={() => {
            setLoading(true);
            sendForgotPassword(email)
              .then(() => {
                setErrorMessage("");
                setShowSuccess(true);
                setShowFailure(false);
                setEmail("");
                setLoading(false);
              })
              .catch((err) => {
                setErrorMessage(err.response.data.message);
                setShowSuccess(false);
                setShowFailure(true);
                setLoading(false);
              });
          }}
        />
      ) : (
        <ActivityIndicator style={styles.loadingCircle} size="large" />
      )}
      <Snackbar
        visible={showSuccess}
        onDismiss={() => setShowSuccess((oldShowSuccess) => !oldShowSuccess)}
        duration={6000}
        style={{ ...styles.alert, backgroundColor: "green" }}
      >
        מייל איפוס סיסמא נשלח
      </Snackbar>
      <Snackbar
        visible={showFailure}
        onDismiss={() => setShowFailure((oldValue) => !oldValue)}
        duration={6000}
        style={{ ...styles.alert, backgroundColor: "red" }}
      >
        אופס... קיימת בעיה
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: { fontWeight: "normal", fontSize: 38 },
  textContainer: {
    marginRight: 20,
    marginTop: "50%",
  },
  input: {
    marginTop: 30,
    width: "90%",
    alignSelf: "center",
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ABF2F9",
  },
  button: {
    width: 150,
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 20,
    height: 60,
  },
  alert: {
    position: "absolute",
    bottom: 0,
    textAlign: "left",
  },
  loadingCircle: {
    marginTop: 20,
  },
});

export default ForgotPassword;
