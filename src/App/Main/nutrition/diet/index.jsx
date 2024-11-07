import React, { useEffect } from "react";
import History from "./tabs/History";
import Tab from "../../components/Tab";
import Spinner from "../../components/Spinner";
import { getDietLogs } from "../actions";
import { connect } from "react-redux";
import { Button, Grid, Header } from "semantic-ui-react";

const DietLog = ({ dietLogs, dietLogsLoading, getDietLogs }) => {
  useEffect(() => {
    if (!dietLogs && !dietLogsLoading) getDietLogs();
  }, [dietLogs, dietLogsLoading]);

  const mainPanes = [
    {
      menuItem: "Historical",
      render: () => {
        return <History />;
      },
    },
  ];
  return (
    <>
      {dietLogsLoading && <Spinner />}
      <Grid columns={2} stackable verticalAlign="bottom">
        <Grid.Column>
          <Header as="h3">Diet Logs</Header>
        </Grid.Column>
        <Grid.Column textAlign="right">
          <Button color="green" icon="plus" content="Add Macro Change" />
        </Grid.Column>
      </Grid>
      <Tab panes={mainPanes} />
    </>
  );
};

function mapStateToProps(state) {
  return {
    dietLogs: state.nutrition.dietLogs,
    dietLogsLoading: state.nutrition.dietLogsLoading,
  };
}

export default connect(mapStateToProps, { getDietLogs })(DietLog);
