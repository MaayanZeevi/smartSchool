export const beautifyTime = (date) => {
  const datee = new Date(date);
  const timeString = date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  return timeString;
};

export const beautifyDate = (date) => {
  const dateString = date;
  const datee = new Date(dateString);
  const formattedDate = datee.toLocaleDateString("en-GB");
  return formattedDate;
};

export const getCurrentDay = () => {
  const day = new Date().getDay();
  switch (day) {
    case 0:
      return "א";
    case 1:
      return "ב";
    case 2:
      return "ג";
    case 3:
      return "ד";
    case 4:
      return "ה";
    case 5:
      return "ו";
    case 6:
      return "ש";

    default:
      break;
  }
};

export const getDayEnglishToNumber = (day) => {
  switch (day) {
    case "sunday":
      return 0;
    case "monday":
      return 1;
    case "tuesday":
      return 2;
    case "wednesday":
      return 3;
    case "thursday":
      return 4;
    case "friday":
      return 5;
    case "saturday":
      return 6;
    default:
      break;
  }
};

export const getToday = () => {
  return new Date().toLocaleDateString("en-GB");
};

export const getDaysBetweenDates = (day, startDate, endDate) => {
  const days = [];
  const startParts = startDate.split("/");
  const endParts = endDate.split("/");
  const current = new Date(
    parseInt(startParts[2]),
    parseInt(startParts[1]) - 1,
    parseInt(startParts[0])
  );
  const end = new Date(
    parseInt(endParts[2]),
    parseInt(endParts[1]) - 1,
    parseInt(endParts[0])
  );
  while (current <= end) {
    if (current.getDay() === day) {
      const day = current.getDate().toString().padStart(2, "0");
      const month = (current.getMonth() + 1).toString().padStart(2, "0");
      const year = current.getFullYear().toString();
      days.push(`${day}/${month}/${year}`);
    }
    current.setDate(current.getDate() + 1);
  }
  return days;
};

export const getDateFromString = (dateString, timeString) => {
  const [day, month, year] = dateString.split("/");
  const [hours, minutes] = timeString.split(":");
  return new Date(year, month - 1, day, hours, minutes);
};

export const getStartOfWeek = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 0);
  const sunday = new Date(today.setDate(diff));
  return new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate());
};
