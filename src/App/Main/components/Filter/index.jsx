import React from "react";
import { Accordion, Icon, List, Checkbox } from "semantic-ui-react";

const Filter = ({
  itemName,
  items,
  filters,
  setFilters,
  openFilter,
  setOpenFilter,
}) => {
  function onFilterChange(e, { checked, value }) {
    if (checked) {
      setFilters([...filters, value]);
    } else {
      setFilters(filters.filter((i) => i !== value));
    }
  }

  return (
    <Accordion styled fluid>
      <Accordion.Title
        active={openFilter}
        onClick={() => setOpenFilter(!openFilter)}
      >
        <Icon name="dropdown" />
        {openFilter
          ? "Hide Filters"
          : `Open Filters (${filters.length} of ${items?.length} ${itemName} selected)`}
      </Accordion.Title>
      <Accordion.Content active={openFilter}>
        <List>
          {items?.map((i) => {
            return (
              <List.Item key={"pose-filter-" + i.name}>
                <Checkbox
                  value={i.name}
                  label={i.name}
                  checked={filters.includes(i.name)}
                  onClick={onFilterChange}
                />
              </List.Item>
            );
          })}
        </List>
      </Accordion.Content>
    </Accordion>
  );
};

export default Filter;
