import React, { useState, useContext } from "react";
import { Segment } from "semantic-ui-react";
import SupplementContext from "../../context/supplementContext";
import ItemsModal from "./components/ItemsModal";
import MonthlyCalendar from "./components/MonthlyCalendar";

const MonthlyView = () => {
  const [activeItems, setActiveItems] = useState(null);
  const { suppItems, suppLogs } = useContext(SupplementContext);

  return (
    <Segment>
      <ItemsModal
        activeItems={activeItems}
        handleClose={() => setActiveItems(null)}
      />
      <MonthlyCalendar
        suppItems={suppItems}
        suppLogs={suppLogs}
        setActiveItems={setActiveItems}
      />
    </Segment>
  );
};

export default MonthlyView;
