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
    setLogType,
    selectedLog,
    setSelectedLog,
    formData,
    setFormData,
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

  React.useEffect(() => {
    if (!logs.length && !logsLoading) {
      getLogs();
    }
  }, [logs, logsLoading]);

  const handleLogTypeChange = (e, { value }) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      logType: value,
    }));
  };

  return (
    <div
      style={{
        width: "70%",
        height: "100%",
        margin: "5rem auto",
        // backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <Segment
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Container style={{ padding: "30px" }}>
                <Card.Group>
                  <Header
                    as="h2"
                    style={{ marginBottom: "20px", textAlign: "center" }}
                  >
                    Create New Log
                  </Header>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "#e8e8e8",
                      padding: "20px",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
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
                        value="MORNING"
                        checked={formData.logType === "MORNING"}
                        onChange={handleLogTypeChange}
                        style={{
                          marginRight: "80px",
                        }}
                      />
                      <Radio
                        label="Night Log"
                        name="logType"
                        value="NIGHT"
                        checked={formData.logType === "NIGHT"}
                        onChange={handleLogTypeChange}
                      />
                    </div>

                    <Button
                      as={Link}
                      to={`/logs/new/${formData.logType}`}
                      style={{
                        margin: "10px",
                        backgroundColor: "#2185d0",
                        color: "white",
                        width: "40%",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "blue")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "#2185d0")
                      }
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
                  padding: "30px",
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                <Card.Group>
                  <Header as="h2" style={{ margin: "20px 100px" }}>
                    Log History
                  </Header>
                  <Container style={{ padding: "20px", width: "100%" }}>
                    {logs
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .map((log) => {
                        const dateObj = new Date(log.date);
                        const formattedDate = new Intl.DateTimeFormat("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }).format(dateObj);

                        return (
                          <Card
                            key={log.id}
                            onClick={() => handleLogClick(log)}
                            style={{
                              backgroundColor: "#f0f0f0",
                              margin: "10px",
                              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              transition: "transform 0.2s",
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.transform = "scale(1.05)")
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.transform = "scale(1)")
                            }
                          >
                            <Card.Content>
                              <Card.Header
                                style={{
                                  color: "#333",
                                  fontSize: "18px",
                                  fontWeight: "bold",
                                  lineHeight: "1.5",
                                }}
                              >
                                {formattedDate}
                              </Card.Header>
                              <Card.Meta
                                style={{
                                  color: "#666",
                                  fontSize: "16px",
                                  lineHeight: "1.4",
                                  textTransform: "capitalize",
                                }}
                              >
                                <strong>Log Type: </strong>
                                {log.logType}
                              </Card.Meta>
                              <Card.Description
                                style={{
                                  color: "#666",
                                  fontSize: "16px",
                                  lineHeight: "1.4",
                                }}
                              >
                                {log.amWeight && (
                                  <p>
                                    <strong>Morning Weight:</strong>{" "}
                                    {log.amWeight}
                                  </p>
                                )}
                                {log.sleepQuality && (
                                  <p>
                                    <strong>Sleep Quality:</strong>{" "}
                                    {log.sleepQuality}
                                  </p>
                                )}
                                {log.sleepHours && (
                                  <p>
                                    <strong>Sleep Hours:</strong>{" "}
                                    {log.sleepHours}
                                  </p>
                                )}
                                {log.stress && (
                                  <p>
                                    <strong>Stress:</strong> {log.stress}
                                  </p>
                                )}
                                {log.soreness && (
                                  <p>
                                    <strong>Soreness:</strong> {log.soreness}
                                  </p>
                                )}
                                {log.mood && (
                                  <p>
                                    <strong>Mood:</strong> {log.mood}
                                  </p>
                                )}
                                {log.energy && (
                                  <p>
                                    <strong>Energy:</strong> {log.energy}
                                  </p>
                                )}
                                {log.workoutComments && (
                                  <p>
                                    <strong>Workout Comments:</strong>{" "}
                                    {log.workoutComments}
                                  </p>
                                )}
                                {log.dayComments && (
                                  <p>
                                    <strong>Day Comments:</strong>{" "}
                                    {log.dayComments}
                                  </p>
                                )}
                              </Card.Description>
                            </Card.Content>
                          </Card>
                        );
                      })}
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
