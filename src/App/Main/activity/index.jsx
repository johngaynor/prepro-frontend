import Tab from "../components/Tab";
import Calendar from "./components/Calendar";

const ActivityLogs = () => {
  const mainPanes = [
    {
      menuItem: "Activity Calendar",
      render: () => {
        return <Calendar />;
      },
    },
  ];
  return <Tab panes={mainPanes} />;
};

export default ActivityLogs;
