import React, { useEffect } from "react";
import { Menu, Button, Icon, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import HelpMenu from "../HelpMenu";
import { connect } from "react-redux";
import { isMobile } from "../../customHooks";
import { authUser, getApps } from "../../actions";

const Navbar = ({ authUser, auth, apps, appsLoading, getApps }) => {
  const [helpMenuOpen, setHelpMenuOpen] = React.useState(false);

  useEffect(() => {
    if (!auth) {
      authUser();
    } else {
      if (!apps.length && !appsLoading) getApps();
    }
  }, [auth, apps]);

  return (
    <Menu fixed="top" inverted color="blue" size="tiny" secondary>
      <Link to="/" className="normal item">
        <Header as="h4" style={{ color: "white" }}>
          physiQ
        </Header>
      </Link>
      {helpMenuOpen && (
        <HelpMenu isOpen={helpMenuOpen} setOpen={setHelpMenuOpen} />
      )}
      <Menu.Item position="right">
        {/* {auth ? (
          <Button
            basic
            inverted
            style={{ marginRight: "3px" }}
            onClick={() => setHelpMenuOpen(true)}
          >
            <Icon name="question circle" />
            Help
          </Button>
        ) : null} */}
        {isMobile && (
          <Button
            basic
            inverted
            onClick={() => window.location.reload()}
            style={{ marginRight: "10px" }}
          >
            <Icon
              name="refresh"
              style={{ margin: isMobile ? "0 auto" : "0 10px 0 0" }}
            />
          </Button>
        )}
        <Button basic inverted href="/logout">
          <Icon
            name="log out"
            style={{ margin: isMobile ? "0 auto" : "0 10px 0 0" }}
          />
          {isMobile ? "" : "Logout"}
        </Button>
      </Menu.Item>
    </Menu>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.app.auth,
    apps: state.app.apps,
    appsLoading: state.app.appsLoading,
  };
}

export default connect(mapStateToProps, {
  authUser,
  getApps,
})(Navbar);
