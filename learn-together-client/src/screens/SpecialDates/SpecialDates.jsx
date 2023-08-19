import { View } from "react-native";
import Header from "../../components/Header/Header";
import ArrowWithLogo from "../../components/ArrowWithLogo/ArrowWithLogo";
import { getSpecialDates as gsd } from "../../api/specialDates";
import LoadingCircle from "../../components/LoadingCircle/LoadingCircle";
import { useEffect, useState } from "react";
import SpecialDateContainer from "../../components/SpecialDateContainer/SpecialDateContainer";
import { ScrollView } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Sidebar from "../../components/Sidebar/Sidebar";
import PlusButton from "../../components/PlusButton/PlusButton";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

const SpecialDates = ({ navigation }) => {
  const { user } = useContext(UserContext);

  const [specialDates, setSpecialDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleSidebarExit = () => {
    setSidebarVisible(false);
  };

  useEffect(() => {
    const getSpecialDates = async () => {
      const specialDates = await gsd();
      setSpecialDates(specialDates.data);
      setLoading(false);
    };
    getSpecialDates();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header
        rightIcon={<ArrowWithLogo navigation={navigation} />}
        title={"תאריכים מיוחדים"}
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
        {specialDates.map((specialDate, index) => (
          <SpecialDateContainer
            key={index}
            name={specialDate.name}
            date={specialDate.date}
            time={specialDate.time}
            dark={index % 2 === 0}
          />
        ))}
      </ScrollView>
      {user.role === "teacher" && (
        <PlusButton
          handlePress={() => {
            navigation.navigate("AddSpecialEvent");
          }}
        />
      )}
    </View>
  );
};

export default SpecialDates;
