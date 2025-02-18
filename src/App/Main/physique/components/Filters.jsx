import React from "react";
import {
  Header,
  Accordion,
  Icon,
  List,
  Checkbox,
  Grid,
  Divider,
} from "semantic-ui-react";
import { InputSelector } from "./FormFields";

const PhysiqueFilters = ({
  filters,
  setFilters,
  openFilter,
  setOpenFilter,
  poses,
}) => {
  function onPoseChange(e, { checked, value }) {
    if (checked) {
      setFilters({ ...filters, poses: [...filters.poses, value] });
    } else {
      setFilters({
        ...filters,
        poses: filters.poses.filter((p) => p !== value),
      });
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
          : `Open Filters (${filters.poses.length} of ${poses?.length} poses selected)`}
      </Accordion.Title>
      <Accordion.Content active={openFilter}>
        <Grid columns="2" doubling stackable divided>
          <Grid.Column>
            <Header as="h3">Poses</Header>
            <Grid columns="2">
              <Grid.Column>
                <List>
                  {poses?.slice(0, Math.ceil(poses.length / 2)).map((p) => {
                    return (
                      <List.Item key={"filter-pose-" + p.id}>
                        <Checkbox
                          value={p.id}
                          label={p.name}
                          checked={filters.poses.includes(p.id)}
                          onClick={onPoseChange}
                        />
                      </List.Item>
                    );
                  })}
                </List>
              </Grid.Column>
              <Grid.Column>
                <List>
                  {poses?.slice(Math.ceil(poses.length / 2)).map((p) => {
                    return (
                      <List.Item key={"filter-pose-" + p.id}>
                        <Checkbox
                          value={p.id}
                          label={p.name}
                          checked={filters.poses.includes(p.id)}
                          onClick={onPoseChange}
                        />
                      </List.Item>
                    );
                  })}
                </List>
              </Grid.Column>
            </Grid>
          </Grid.Column>
          <Grid.Column>
            <Divider horizontal>Weight</Divider>
            <Grid columns={2} style={{ marginBottom: 20 }}>
              <InputSelector
                placeholder="Min Weight"
                value={filters.weight.min}
                label="Min Weight"
                name="startWeight"
                onChange={(name, value) =>
                  setFilters({
                    ...filters,
                    weight: { ...filters.weight, min: parseFloat(value) },
                  })
                }
              />
              <InputSelector
                placeholder="Max Weight"
                value={filters.weight.max}
                label="Max Weight"
                name="maxWeight"
                onChange={(name, value) =>
                  setFilters({
                    ...filters,
                    weight: { ...filters.weight, max: parseFloat(value) },
                  })
                }
              />
            </Grid>
            <Divider horizontal>DATE</Divider>
            <Grid columns={2}>
              <InputSelector
                placeholder="Start Date"
                value={filters.date.start}
                label="Start Date"
                name="startDate"
                onChange={(name, value) =>
                  setFilters({
                    ...filters,
                    date: { ...filters.date, start: value },
                  })
                }
                type="date"
              />
              <InputSelector
                placeholder="End Date"
                value={filters.date.end}
                label="End Date"
                name="endDate"
                onChange={(name, value) =>
                  setFilters({
                    ...filters,
                    date: { ...filters.date, end: value },
                  })
                }
                type="date"
              />
            </Grid>
          </Grid.Column>
        </Grid>
      </Accordion.Content>
    </Accordion>
  );
};

export default PhysiqueFilters;
