import { Menu, Header, Button, Icon, Segment } from "semantic-ui-react";
import { isMobile } from "../../customHooks";

// also takes in resetErrorBoundary prop
const DefaultError = ({ error }) => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Menu fixed="top" inverted color="blue" size="tiny" secondary>
        <a href="/" className="normal item">
          <Header as="h4" style={{ color: "white" }}>
            PrePro Labs
          </Header>
        </a>
        <Menu.Item position="right">
          <Button
            basic
            inverted
            style={{ marginRight: "3px" }}
            onClick={() => alert("Send support ticket")}
          >
            <Icon name="question circle" />
            Help
          </Button>
        </Menu.Item>
      </Menu>
      <div
        style={{
          margin: "1rem",
          paddingTop: isMobile ? 10 : 0,
        }}
      >
        <Segment
          style={{
            height: "60vh",
            width: "90vw",
            maxWidth: 800,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Icon name="exclamation circle" size="huge" color="red" />
          <Header as="h1" style={{ textAlign: "center" }}>
            Something went wrong
          </Header>
          <p>"{error.message}"</p>
          <div style={{ maxHeight: 200, overflowY: "auto", margin: 10 }}>
            <strong style={{ fontSize: 20 }}>Stack Trace:</strong>
            <p>{error.stack}</p>
          </div>
          <Button
            icon
            onClick={() => window.location.reload()}
            color="blue"
            style={{ marginTop: 20 }}
          >
            <Icon name="refresh" />
          </Button>
        </Segment>
      </div>
    </div>
  );
};

export default DefaultError;
