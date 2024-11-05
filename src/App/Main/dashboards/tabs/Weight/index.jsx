import React, { useEffect, useState } from "react";
import { Tab, Header, Segment, Grid } from "semantic-ui-react";
import Spinner from "../../../components/Spinner";
import { connect } from "react-redux";
import WeightChart from "./WeightChart";
import { getWeightLogs } from "../../../nutrition/actions";

const Weight = ({
  // from redux
  weightLogs,
  logsLoading,
  getWeightLogs,
}) => {
  const [primary, setPrimary] = useState(7);
  const [secondary, setSecondary] = useState(30);

  useEffect(() => {
    if (!weightLogs && !logsLoading) getWeightLogs();
  }, [weightLogs, logsLoading]);

  console.log(weightLogs);

  return (
    <Tab.Pane>
      {logsLoading && <Spinner />}
      <Header as="h2">Weight Logs</Header>
      {/* <DropdownField
        label="Selected User"
        placeholder="Select a user to manage..."
        options={
          apiUsers
            ? apiUsers.map((u) => ({
                text: u.name + " - " + u.email,
                value: u.id,
              }))
            : []
        }
        value={activeUser}
        onChange={(e, { value }) => setActiveUser(value)}
      /> */}
      <Grid columns={2}>
        <Grid.Column>
          <Segment>
            <WeightChart />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <WeightChart />
          </Segment>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

function mapStateToProps(state) {
  return {
    weightLogs: state.nutrition.weightLogs,
    logsLoading: state.nutrition.logsLoading,
  };
}

export default connect(mapStateToProps, { getWeightLogs })(Weight);
