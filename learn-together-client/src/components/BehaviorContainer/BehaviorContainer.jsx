import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { beautifyDate } from "../../utils/date";

const BehaviorContainer = ({ date, lessonNumber, subject, type, dark }) => {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: dark ? "#B9E9EB" : "#E8F9F9",
        borderRadius: 10,
        marginHorizontal: 20,
        marginVertical: 10,
        paddingVertical: 20,
        paddingHorizontal: 30,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <View style={styles.leftContainer}>
        <Text style={styles.typeText}>
          {type === "interference"
            ? "הפרעה"
            : type === "goodWord"
            ? "מילה טובה"
            : type === "late"
            ? "איחור"
            : type === "absence"
            ? "חיסור"
            : type === "attendance"
            ? "נוכחות"
            : ""}
        </Text>
        <Text style={styles.subjectText}>{subject}</Text>
      </View>
      <View style={styles.rightContainer}>
        {/* <Text style={styles.lessonText}>שיעור {lessonNumber}</Text> */}
        <Text style={styles.dateText}></Text>
        <Text style={styles.dateText}>{beautifyDate(date)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  leftContainer: {
    flex: 1,
    marginRight: 20,
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  typeText: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: "#333333",
    marginBottom: 10,
  },
  subjectText: {
    fontSize: 20,
    fontFamily: "Roboto",
    color: "#666666",
    marginBottom: 10,
  },
  lessonText: {
    fontSize: 20,
    fontFamily: "Roboto",
    color: "#666666",
    marginBottom: 10,
  },
  dateText: {
    fontSize: 20,
    fontFamily: "Roboto",
    color: "#666666",
  },
});

export default BehaviorContainer;
