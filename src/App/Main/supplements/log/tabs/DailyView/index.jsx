import React from "react";
import { Grid, Header, Tab, Button, Container, Form } from "semantic-ui-react";

const DailyView = () => {
  return (
    <Tab.Pane>
      <Container>
        <Header as="h1">Daily View</Header>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Form>
                <Form.Field>
                  <label>Date</label>
                  <input type="date" />
                </Form.Field>
                <Form.Field>
                  <label>Supplement</label>
                  <input type="text" />
                </Form.Field>
                <Form.Field>
                  <label>Amount</label>
                  <input type="number" />
                </Form.Field>
                <Form.Field>
                  <label>Unit</label>
                  <input type="text" />
                </Form.Field>
                <Button primary type="submit">
                  Submit
                </Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Tab.Pane>
  );
};

export default DailyView;
