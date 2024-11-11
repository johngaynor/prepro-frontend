import Tab from "../components/Tab";
import Weight from "./tabs/Weight";
import Diet from "./tabs/Diet";

const Dashboards = () => {
  const mainPanes = [
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
