import { List, Checkbox, Card, Segment } from "semantic-ui-react";
import Spinner from "../../../components/Spinner";
import React from "react";
import AdminContext from "../../Context/adminContext";

const AppSelector = ({ activeUser, activeUserApps }) => {
  const { toggleUserAppAccess, accessChanging } =
    React.useContext(AdminContext);

  const categories = new Set(
    activeUserApps
      .map((app) => app.link.toUpperCase().split("/", 2).join(""))
      .sort()
  );
  const renderItem = (app, i) => {
    let bgC = "";
    if (i % 2 === 0) {
      bgC = "#ffffff";
    } else {
      bgC = "#e8e8e8";
    }
    return (
      <List.Item
        key={app.id}
        style={{ backgroundColor: bgC, paddingBottom: "-10px" }}
      >
        <List.Description>{app.name}</List.Description>
        <List.Content floated="right">
          <Checkbox
            toggle
            checked={!!app.access || app.allUsers}
            onChange={(e) => toggleUserAppAccess(activeUser, app)}
            disabled={app.restricted || app.allUsers}
          />
        </List.Content>
      </List.Item>
    );
  };
  const renderItems = (category) => {
    let categoryItems = activeUserApps
      .filter(
        (app) => app.link.toUpperCase().split("/", 2).join("") === category
      )
      .sort((a, b) => (a.name > b.name ? 1 : -1));
    return (
      <List divided relaxed>
        {categoryItems.map((item, i) => renderItem(item, i))}
      </List>
    );
  };
  let categoryList = [];
  categories.forEach((cat) => categoryList.push(cat));
  return (
    <Segment basic>
      {accessChanging && <Spinner />}
      <Card.Group itemsPerRow={3} doubling stackable centered>
        {categoryList.map((cat, i) => (
          <Card key={i}>
            <Card.Header
              style={{
                backgroundColor: "#2185d0",
                fontWeight: "bold",
                color: "White",
              }}
              textAlign="center"
            >
              {cat}
            </Card.Header>
            <Card.Content>{renderItems(cat)}</Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Segment>
  );
};

export default AppSelector;
