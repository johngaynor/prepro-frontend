import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Header,
  HeaderSubheader,
  Segment,
  Grid,
  Icon,
  Input,
  Table,
  TableHeaderCell,
  TableRow,
  TableBody,
  Message,
  TableHeader,
} from "semantic-ui-react";
import { IntegrationBox } from "./components/IntegrationBox";
import { IntegrationRow } from "./components/IntegrationRow";
import { getSleepIntegrations } from "../../actions";

const SleepIntegrations = ({
  userIntegrations,
  integrationsLoading,
  getSleepIntegrations,
}) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!userIntegrations && !integrationsLoading) getSleepIntegrations();
  }, [userIntegrations, integrationsLoading, getSleepIntegrations]);

  const filteredIntegrations = userIntegrations?.filter((i) =>
    i.name.toLowerCase().includes(search)
  );

  const integrations = [
    {
      id: 1,
      title: "Oura Ring",
      description: "Pull sleep logs from Oura.",
      icon: "bed",
    },
    {
      id: 2,
      title: "Apple Watch (COMING SOON)",
      description: "Integrate with Apple Health.",
      icon: "stopwatch",
      color: "purple",
    },
  ];
  return (
    <Segment>
      <Header as="h1">Integrations</Header>
      <Grid columns={2} doubling stackable>
        <Grid.Column width={11}>
          <Input
            icon="search"
            iconPosition="left"
            placeholder="Search integrations..."
            style={{ width: "100%" }}
            onChange={(e, { value }) => setSearch(value.toLowerCase())}
          />
          {!filteredIntegrations?.length ? (
            <Message info>No integrations found.</Message>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Name</TableHeaderCell>
                  <TableHeaderCell>Description</TableHeaderCell>
                  <TableHeaderCell>Value</TableHeaderCell>
                  <TableHeaderCell></TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIntegrations?.map((i) => (
                  <IntegrationRow key={i.id} {...i} />
                ))}
              </TableBody>
            </Table>
          )}
        </Grid.Column>
        <Grid.Column width={5}>
          <Segment>
            <Icon
              name="cogs"
              color="blue"
              size="big"
              style={{
                margin: "0 auto -20px auto",
                display: "flex",
                justifyContent: "center",
              }}
            />
            <Header as="h2" icon>
              Latest Integrations
              <HeaderSubheader>
                Integrate with external platforms to consolidate your health
                data on PreProLabs.
              </HeaderSubheader>
            </Header>
            {integrations.map((i) => (
              <IntegrationBox key={i.id} {...i} />
            ))}
          </Segment>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

function mapStateToProps(state) {
  return {
    userIntegrations: state.sleep.integrations,
    integrationsLoading: state.sleep.integrationsLoading,
  };
}

export default connect(mapStateToProps, { getSleepIntegrations })(
  SleepIntegrations
);
