import { View } from "react-native";
import { getBehavior as gb } from "../../api/behavior";
import Header from "../../components/Header/Header";
import ArrowWithLogo from "../../components/ArrowWithLogo/ArrowWithLogo";
import { useState } from "react";
import { useEffect } from "react";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import LoadingCircle from "../../components/LoadingCircle/LoadingCircle";
import BehaviorContainer from "../../components/BehaviorContainer/BehaviorContainer";
import { ScrollView } from "react-native";
import Sidebar from "../../components/Sidebar/Sidebar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Behavior = ({ navigation }) => {
  const [behaviorList, setBehaviorList] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSidebarExit = () => {
    setSidebarVisible(false);
  };

  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    const getBehavior = async () => {
      try {
        const behaviorList = await gb();
        setBehaviorList(behaviorList);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getBehavior();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={"משמעת"}
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
      <ScrollView>
        <LoadingCircle loading={loading} />
        {behaviorList.map((behavior, index) => (
          <BehaviorContainer key={index} {...behavior} dark={index % 2 === 0} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Behavior;
