import { Grid, Header } from "semantic-ui-react";
import { calculateHoursMinutes } from "./helperFunctions";

export const StatisticsBox = ({
  value = null,
  label = "--",
  color = "blue",
}) => {
  return (
    <Grid.Column>
      <Header
        icon
        style={{
          fontSize: 40,
          marginBottom: 0,
        }}
        color={color}
      >
        {calculateHoursMinutes(value)}
      </Header>
      <Header as="h2" icon style={{ marginTop: 0 }}>
        {label}
      </Header>
    </Grid.Column>
  );
};
