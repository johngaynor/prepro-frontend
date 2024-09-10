import Tab from "../components/Tab";
import Calendar from "./components/Calendar";
import { ActivityProvider } from "./context/activityContext";

const ActivityLogs = () => {
  const mainPanes = [
    {
      menuItem: "Activity Calendar",
      render: () => {
        return <Calendar />;
      },
    },
  ];
  return (
    <ActivityProvider>
      <Tab panes={mainPanes} />
    </ActivityProvider>
  );
};

export default ActivityLogs;
