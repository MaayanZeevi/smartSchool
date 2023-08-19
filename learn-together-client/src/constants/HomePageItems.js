export const optionsList = [
  {
    title: "מערכת שעות",
    icon: <MaterialCommunityIcons name="calendar-clock" size={50} />,
    navigate: () => {
      navigation.navigate("Schedule");
    },
  },
  {
    title: "הודעות",
    icon: <MaterialCommunityIcons name="message" size={50} />,
    navigate: () => {
      navigation.navigate("MessageBoard");
    },
  },
  {
    title: 'ש"ב',
    icon: <MaterialCommunityIcons name="book-outline" size={50} />,
    navigate: () => {
      navigation.navigate("Homework");
    },
  },
  {
    title: "תאריכים מיוחדים",
    icon: <MaterialCommunityIcons name="calendar-star" size={50} />,
    navigate: () => {
      navigation.navigate("SpecialDates");
    },
  },
  {
    title: "מבחנים",
    icon: <MaterialCommunityIcons name="school" size={50} />,
    navigate: () => {
      navigation.navigate("TestSchedule");
    },
  },
  {
    title: "נוכחות",
    icon: <MaterialCommunityIcons name="qrcode" size={50} />,
    navigate: () => {
      navigation.navigate("ReportingPresence");
    },
  },
  {
    title: "התנהגות",
    icon: <MaterialCommunityIcons name="emoticon-angry" size={50} />,
    navigate: () => {
      navigation.navigate("Behavior");
    },
  },
  {
    title: "פרטים אישיים",
    icon: <MaterialCommunityIcons name="card-account-details" size={50} />,
  },
  {
    title: "ציונים",
    icon: <MaterialCommunityIcons name="star" size={50} />,
    navigate: () => {
      navigation.navigate("Grades");
    },
  },
];
