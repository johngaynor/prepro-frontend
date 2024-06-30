import React from "react";
import {
  Grid,
  Button,
  Card,
  Header,
  Label,
  Container,
} from "semantic-ui-react";
import { InputField } from "../../../components/FormFields";

const AppCard = ({ app, selectedApps, setSelectedApps }) => {
  return (
    <Grid.Column
      mobile={16} // < 768
      tablet={8} // 768-991
      computer={8} // 992-1199
      largeScreen={5} // 1200+
    >
      <Card fluid>
        <Card.Header textAlign="left">
          <Header as="h3">{app.name}</Header>
        </Card.Header>
        <Card.Content textAlign="left">
          <Grid columns={2}>
            <Grid.Column width={2} />
            <Grid.Column>
              <Label
                horizontal
                style={{ minWidth: "45%", textAlign: "center" }}
              >
                Changes:
              </Label>
            </Grid.Column>
            {Object.keys(selectedApps[app.id]).map((text, i) => (
              <Grid.Row key={"app-change" + i} style={{ marginTop: "-20px" }}>
                <Grid.Column width={2}>
                  <Button color="red" icon="cancel" type="button" />
                </Grid.Column>
                <Grid.Column width={14}>
                  <InputField
                    value={selectedApps[app.id][text]}
                    placeholder="notes"
                    onChange={(e, { value }) =>
                      setSelectedApps({
                        ...selectedApps,
                        [app.id]: { ...selectedApps[app.id], [text]: value },
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
                  [app.id]: { ...selectedApps[app.id], [orderId]: "" },
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
