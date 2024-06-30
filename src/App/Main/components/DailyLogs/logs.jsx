import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { apiCall } from "../../../services/api";
import LogContext from "../Context/logContext";
import { Link } from "react-router-dom";

import {
  Header,
  Card,
  Segment,
  Input,
  Grid,
  Transition,
  Container,
  Button,
  Radio,
  Form,
} from "semantic-ui-react";

const Logs = () => {
  const {
    logs,
    setLogs,
    logsLoading,
    setLogsLoading,
    logType,
    setLogType,
    selectedLog,
    setSelectedLog,
  } = React.useContext(LogContext);

  const handleLogClick = (log) => {
    setSelectedLog(log);
  };

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

  const handleLogTypeChange = (e, { value }) => setLogType(value);

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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        padding: "10px",
                      }}
                    >
                      <Radio
                        label="Morning Log"
                        name="logType"
                        value="morning"
                        checked={logType === "morning"}
                        onChange={handleLogTypeChange}
                        style={{
                          marginRight: "10px",
                        }}
                      />
                      <Radio
                        label="Night Log"
                        name="logType"
                        value="night"
                        checked={logType === "night"}
                        onChange={handleLogTypeChange}
                      />
                    </div>

                    <Button
                      as={Link}
                      to={`/logs/new/${logType}`}
                      style={{
                        margin: "10px",
                      }}
                    >
                      <Button.Content>Create</Button.Content>
                    </Button>
                  </div>
                </Card.Group>
              </Container>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Container
                style={{
                  padding: "20px",
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                <Card.Group>
                  <Header>Log History</Header>
                  <Container style={{ padding: "20px" }}>
                    {logs.map((log) => (
                      <Card key={log.id} onClick={() => handleLogClick(log)}>
                        <Card.Content>
                          <Card.Header>{log.date}</Card.Header>
                          <Card.Description>{log.amWeight}</Card.Description>
                        </Card.Content>
                      </Card>
                    ))}
                    {selectedLog && (
                      <Form
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "20px",
                          width: "300px",
                        }}
                      >
                        <Form.Field>
                          <label>Date</label>
                          <Input value={selectedLog.date} readOnly />
                        </Form.Field>
                        <Form.Field>
                          <label>AM Weight</label>
                          <Input value={selectedLog.amWeight} readOnly />
                        </Form.Field>
                        <Form.Field>
                          <label>Sleep Quality</label>
                          <Input value={selectedLog.sleepQuality} readOnly />
                        </Form.Field>
                        <Form.Field>
                          <label>Sleep Hours</label>
                          <Input value={selectedLog.sleepHours} readOnly />
                        </Form.Field>
                        <Form.Field>
                          <label>Stress</label>
                          <Input value={selectedLog.stress} readOnly />
                        </Form.Field>
                        <Form.Field>
                          <label>Soreness</label>
                          <Input value={selectedLog.soreness} readOnly />
                        </Form.Field>
                        <Form.Field>
                          <label>Mood</label>
                          <Input value={selectedLog.mood} readOnly />
                        </Form.Field>
                        <Form.Field>
                          <label>Energy</label>
                          <Input value={selectedLog.energy} readOnly />
                        </Form.Field>
                      </Form>
                    )}
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
