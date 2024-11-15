import Tab from "../components/Tab";
import Weight from "./tabs/Weight";
import Diet from "./tabs/Diet";
import Sleep from "./tabs/Sleep";

const Dashboards = () => {
  const mainPanes = [
    {
      menuItem: "Sleep",
      render: () => {
        return <Sleep />;
      },
    },
    {
      menuItem: "Weight",
      render: () => {
        return <Weight />;
      },
    },
    {
      menuItem: "Diet",
      render: () => {
        return <Diet />;
      },
    },
  ];
  return <Tab panes={mainPanes} />;
};

export default Dashboards;
