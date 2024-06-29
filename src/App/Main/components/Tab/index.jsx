import React from "react";
import { Tab as Stab } from "semantic-ui-react";

const Tab = ({ panes, color, activeIndex, onTabChange, secondary }) => {
  const [activeTab, setActiveTab] = React.useState(0);

  function tabChange(e, p) {
    setActiveTab(p.activeIndex);
  }

  return (
    <Stab
      activeIndex={activeIndex ?? activeTab}
      panes={panes}
      menu={{
        pointing: true,
        className: "wrapped",
        inverted: !secondary,
        secondary: secondary,
        color: color ?? "black",
      }}
      onTabChange={onTabChange ?? tabChange}
    />
  );
};
Tab.Pane = Stab.Pane;
export default Tab;
