import { View } from "react-native";
import Header from "../../components/Header/Header";
import HomeworkContainer from "../../components/HomeworkContainer/HomeworkContainer";
import { getHomework } from "../../api/homework";
import { ScrollView } from "react-native";
import { useEffect } from "react";
import { useState } from "react";
import ArrowWithLogo from "../../components/ArrowWithLogo/ArrowWithLogo";
import LoadingCircle from "../../components/LoadingCircle/LoadingCircle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Sidebar from "../../components/Sidebar/Sidebar";

const Homewoerk = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleSidebarExit = () => {
    setSidebarVisible(false);
  };

  useEffect(() => {
    getHomework()
      .then((grades) => {
        setTasks(grades.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={"שיעורי בית"}
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
      <LoadingCircle loading={loading} />
      <ScrollView>
        {tasks.map((item, index) => (
          <HomeworkContainer
            key={index}
            subject={item.subject}
            date={item.date}
            description={item.description}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Homewoerk;
