import React from "react";
import {
  Grid,
  Button,
  Card,
  Header,
  Label,
  Container,
} from "semantic-ui-react";
import { DropdownField, InputField } from "../../../components/FormFields";

const AppCard = ({ app, selectedApps, setSelectedApps }) => {
  return (
    <Grid.Column
      tablet={16} // 768-991
      computer={8} // 992-1199
    >
      <Card fluid>
        <Card.Header textAlign="left">
          <Header as="h3">{app.name}</Header>
          <p>{app.description}</p>
        </Card.Header>
        <Card.Content textAlign="left">
          <Grid columns={3}>
            <Grid.Column width={2} />
            <Grid.Column width={9}>
              <Label
                horizontal
                style={{ minWidth: "45%", textAlign: "center" }}
              >
                Changes:
              </Label>
            </Grid.Column>
            <Grid.Column width={5}>
              <Label
                horizontal
                style={{ minWidth: "45%", textAlign: "center" }}
              >
                Type:
              </Label>
            </Grid.Column>
            {Object.keys(selectedApps[app.id]).map((item, i) => (
              <Grid.Row key={"app-change" + i} style={{ marginTop: "-20px" }}>
                <Grid.Column width={2}>
                  <Button
                    color="red"
                    icon="cancel"
                    type="button"
                    onClick={() => {
                      const apps = { ...selectedApps };
                      delete apps[app.id][item];
                      setSelectedApps(apps);
                    }}
                  />
                </Grid.Column>
                <Grid.Column width={9}>
                  <InputField
                    value={selectedApps[app.id][item].text}
                    placeholder="notes"
                    onChange={(e, { value }) =>
                      setSelectedApps({
                        ...selectedApps,
                        [app.id]: {
                          ...selectedApps[app.id],
                          [item]: {
                            ...selectedApps[app.id][item],
                            text: value,
                          },
                        },
                      })
                    }
                  />
                </Grid.Column>
                <Grid.Column width={5}>
                  <DropdownField
                    options={[
                      {
                        text: "Bug Fix",
                        value: "bug",
                      },
                      {
                        text: "New Feature",
                        value: "new",
                      },
                      {
                        text: "Reverted Feature",
                        value: "reverted",
                      },
                    ]}
                    value={selectedApps[app.id][item].type}
                    onChange={(e, { value }) =>
                      setSelectedApps({
                        ...selectedApps,
                        [app.id]: {
                          ...selectedApps[app.id],
                          [item]: {
                            ...selectedApps[app.id][item],
                            bug: value,
                          },
                        },
                      })
                    }
                  />
                </Grid.Column>
              </Grid.Row>
            ))}
          </Grid>
          <Container
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
          >
            <Button
              icon="plus"
              color="green"
              style={{ marginRight: 0 }}
              onClick={() => {
                const orderId =
                  Math.max(...Object.keys(selectedApps[app.id])) + 1;
                setSelectedApps({
                  ...selectedApps,
                  [app.id]: {
                    ...selectedApps[app.id],
                    [orderId]: { text: "", type: "bug" },
                  },
                });
              }}
              type="button"
            />
          </Container>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
};

export default AppCard;
