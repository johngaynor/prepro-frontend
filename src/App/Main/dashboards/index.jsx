import Tab from "../components/Tab";
import Weight from "./tabs/Weight";

const Dashboards = () => {
  const mainPanes = [
    {
      menuItem: "Weight",
      render: () => {
        return <Weight />;
      },
    },
    // {
    //   menuItem: "Sleep",
    //   render: () => {
    //     return <BuildLog />;
    //   },
    // },
  ];
  return <Tab panes={mainPanes} />;
};

export default Dashboards;
