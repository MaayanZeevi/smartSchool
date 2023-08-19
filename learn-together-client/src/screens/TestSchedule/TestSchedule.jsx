import { ScrollView, View } from "react-native";
import TestBox from "../../components/TestBox/TestBox";
import { StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { getMyTests } from "../../api/tests";
import LoadingCircle from "../../components/LoadingCircle/LoadingCircle";
import ArrowWithLogo from "../../components/ArrowWithLogo/ArrowWithLogo";
import Sidebar from "../../components/Sidebar/Sidebar";

const TestSchedule = ({ navigation }) => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleSidebarExit = () => {
    setSidebarVisible(false);
  };

  useEffect(() => {
    getMyTests()
      .then((res) => {
        setTests(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={styles.pageContainer}>
      <Header
        rightIcon={<ArrowWithLogo navigation={navigation} />}
        title={"בחינות"}
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

      <LoadingCircle loading={loading} />

      <ScrollView>
        {tests.map((test, index) => (
          <TestBox
            key={index}
            subject={test.subject}
            startDate={test.startDate}
            endDate={test.endDate}
            moed={test.moed}
            dark={index % 2}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: { flex: 1 },
});

export default TestSchedule;
