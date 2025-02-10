import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Header,
  Card,
  Segment,
  Input,
  Grid,
  Transition,
  Container,
  Button,
  Popup,
  Rating,
  Form,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { getFavorites, updateFavorite } from "../actions";
import { checkOuraLogs } from "../sleep/actions";
import { DateTime } from "luxon";

const Dashboard = ({
  startsWith,
  user,
  apps,
  favorites,
  favoritesLoading,
  getFavorites,
  updateFavorite,
  ouraLoading,
  checkedOura,
  checkOuraLogs,
}) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!favorites && !favoritesLoading) getFavorites();
  }, [favorites, favoritesLoading]);

  // check sleep logs
  useEffect(() => {
    if (!checkedOura && !ouraLoading)
      checkOuraLogs(DateTime.now().toFormat("yyyy-MM-dd"));
  }, [checkedOura, ouraLoading, checkOuraLogs]);

  const cardGroup = apps
    .filter(
      (app) =>
        app.link.startsWith(startsWith) &&
        app.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (!sort || !favorites) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      } else {
        if (favorites.includes(a.id) && !favorites.includes(b.id)) return -1;
        if (!favorites.includes(a.id) && favorites.includes(b.id)) return 1;
        return 0;
      }
    });

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
          <Form
            onSubmit={() =>
              cardGroup[0] ? navigate(cardGroup[0]?.link) : setSearch("")
            }
          >
            <Input
              onChange={(e, v) => setSearch(v.value)}
              icon="search"
              fluid
              placeholder="Search for an app..."
              value={search}
            />
          </Form>
        </Grid.Column>
        <Grid.Column>
          <Popup
            hideOnScroll
            content={
              sort
                ? "Click to sort alphabetically"
                : "Click to show favorites first"
            }
            trigger={
              sort ? (
                <Button
                  content="Sort"
                  icon="sort alphabet down"
                  onClick={() => setSort(!sort)}
                />
              ) : (
                <Button
                  content="Favorites"
                  icon="favorite"
                  onClick={() => setSort(!sort)}
                />
              )
            }
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
          {cardGroup.map((app) => (
            <Card link style={{ height: "10rem", margin: 5 }} key={app.id}>
              <Rating
                style={{
                  position: "absolute",
                  zIndex: 10,
                  top: 5,
                  left: 5,
                  fontSize: "1.4em",
                }}
                onClick={() => updateFavorite(app.id)}
                rating={favorites && favorites.includes(app.id) ? 1 : 0}
                maxRating={1}
                icon="star"
              />
              <Link
                to={app.link}
                key={app.id}
                style={{ margin: 0, padding: 0 }}
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
          ))}
        </Transition.Group>
      ) : (
        <Segment basic textAlign="center">
          No Apps found with your search parameters...
        </Segment>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.app.user,
    apps: state.app.apps,
    favorites: state.app.favorites,
    favoritesLoading: state.app.favoritesLoading,
    ouraLoading: state.sleep.editLoading,
    checkedOura: state.sleep.checkedOura,
  };
}

export default connect(mapStateToProps, {
  getFavorites,
  updateFavorite,
  checkOuraLogs,
})(Dashboard);
