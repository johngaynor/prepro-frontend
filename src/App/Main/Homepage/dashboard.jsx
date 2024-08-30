import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Header,
  Card,
  Segment,
  Input,
  Grid,
  Transition,
  Container,
} from "semantic-ui-react";
import AppContext from "../context/appContext";

const Dashboard = ({ startsWith }) => {
  const [search, setSearch] = useState("");

  const { user, apps } = React.useContext(AppContext);
  const cardGroup = apps
    .filter(
      (app) =>
        app.link.startsWith(startsWith) &&
        app.name.toLowerCase().includes(search.toLowerCase())
    )
    .map((app) => (
      <Card link style={{ height: "10rem", margin: 5 }} key={app.id}>
        <Link
          to={app.link}
          key={app.id}
          style={{ margin: 0, padding: 0 }}
          // onClick={() => {
          //   window.dataLayer.push({
          //     appId: app.id,
          //     userId: currentUser.user.id,
          //   });
          // }}
          className="appTile"
        >
          <Card>
            <Card.Content style={{ height: "10rem" }}>
              <Card.Header>{app.name}</Card.Header>
              <Card.Description style={{ margin: 0 }}>
                {app.description}
              </Card.Description>
            </Card.Content>
          </Card>
        </Link>
      </Card>
    ));
  if (
    cardGroup.length === 0 &&
    startsWith !== "/" &&
    apps.length &&
    !startsWith
  ) {
    return (
      <Container>
        <Card fluid>
          <Card.Header textAlign="center" as="h3">
            404 - Oh No! Something went wrong...
          </Card.Header>
          <Card.Content textAlign="center">
            Either the route you requested does not exist or you do not have
            access. Please try again.
          </Card.Content>
        </Card>
      </Container>
    );
  }
  return (
    <div className="header" style={{ marginTop: "80px" }}>
      <Segment basic textAlign="center">
        <Header as="h2" textAlign="center">
          {user.name}
        </Header>
        Select an app from the{" "}
        {startsWith !== "/" ? `${startsWith} ` : "following"} list:
      </Segment>
      <Grid columns={3} stackable>
        <Grid.Column />
        <Grid.Column>
          <Input
            onChange={(e, v) => setSearch(v.value)}
            icon="search"
            fluid
            placeholder="Search for an app..."
            value={search}
          />
        </Grid.Column>
      </Grid>
      {cardGroup.length || !apps.length ? (
        <Transition.Group
          as={Card.Group}
          duration={300}
          animation="fade"
          className="ui centered relaxed grid container"
        >
          {cardGroup}
        </Transition.Group>
      ) : (
        <Segment basic textAlign="center">
          No Apps found with your search parameters...
        </Segment>
      )}
    </div>
  );
};

export default Dashboard;
