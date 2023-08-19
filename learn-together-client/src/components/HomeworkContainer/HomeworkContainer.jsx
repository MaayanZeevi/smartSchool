import { StyleSheet, Text, View } from "react-native";

const HomeworkContainer = ({ subject, date, description }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subject}>{subject}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.text}>תיאור: {description}</Text>
        <Text style={styles.text}>תאריך: {date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  header: {
    backgroundColor: "#B9E9EB",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  body: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  subject: {
    fontWeight: "bold",
    fontSize: 25,
    // fontFamily: "Roboto",
    color: "#333333",
  },
  text: {
    fontSize: 17,
    // fontFamily: "Roboto",
    color: "#666666",
    marginVertical: 5,
  },
});

export default HomeworkContainer;
