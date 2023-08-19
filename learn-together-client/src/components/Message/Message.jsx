import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Message = ({ title, date, time, sender, content }) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 9 }}>
        <View style={styles.rowFlexContainer}>
          <MaterialCommunityIcons name="email" size={20} style={styles.icon} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.rowFlexContainer}>
          <Text style={styles.details}>
            {date} | {time} | {sender.name ? sender.name : sender}
          </Text>
        </View>
        <Text numberOfLines={1} style={styles.body}>
          {content}
        </Text>
      </View>
      <MaterialCommunityIcons
        name="chevron-left"
        size={40}
        style={styles.leftArrow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row-reverse",
    backgroundColor: "white",
    width: "95%",
    alignSelf: "center",
    padding: 10,
    marginTop: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
  title: {
    color: "#287B9A",
    fontSize: 20,
    fontWeight: "bold",
  },
  rowFlexContainer: {
    display: "flex",
    flexDirection: "row-reverse",
  },
  icon: {
    verticalAlign: "bottom",
    marginLeft: 3,
  },
  details: {
    color: "#8ACDE6",
    marginTop: 1,
    marginBottom: 1,
  },
  body: {},
  leftArrow: {
    flex: 1,
    verticalAlign: "middle",
  },
});

export default Message;
