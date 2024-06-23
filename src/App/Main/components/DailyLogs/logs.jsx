import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { apiCall } from "../../../services/api";
import LogContext from "../Context/logContext";

import {
  Header,
  Card,
  Segment,
  Input,
  Grid,
  Transition,
  Container,
  Button,
} from "semantic-ui-react";

const Logs = () => {
  const { logs, setLogs, logsLoading, setLogsLoading } =
    React.useContext(LogContext);

  function getLogs() {
    setLogsLoading(true);
    apiCall("get", "/api/logs")
      .then((res) => {
        setLogs(res.result);
      })
      .catch((err) => {
        toast.error(`Error getting user apps: ${err}`);
      });
    setLogsLoading(false);
  }

  useEffect(() => {
    if (!logs.length && !logsLoading) {
      getLogs();
    }
  }, []);

  console.log(logs);

  return (
    <div style={{ width: "70%", height: "100%", margin: "5rem auto" }}>
      <Header as="h1">Logs</Header>
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <Container style={{ padding: "20px" }}>
                <Card.Group>
                  <Header>Create New Log</Header>
                  <Button>
                    <Button.Content>Create</Button.Content>
                  </Button>
                </Card.Group>
              </Container>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Container>
                <Card.Group>
                  <Header>Log History</Header>
                  <Container>
                    {logs.map((log) => (
                      <Card key={log.id}>
                        <Card.Content>
                          <Card.Header>{log.date}</Card.Header>
                          <Card.Description>{log.amWeight}</Card.Description>
                        </Card.Content>
                      </Card>
                    ))}
                  </Container>
                </Card.Group>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};

export default Logs;
