import React from "react";
import { Menu, Button, Icon, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import HelpMenu from "../HelpMenu";
// import Logo from "../../../images/logo-3.png";
// import ChangeLog from "../ChangeLog";
import { connect } from "react-redux";
import { authUser, getApps } from "../../actions";

const Navbar = ({ authUser, auth, apps, appsLoading, getApps }) => {
  const [helpMenuOpen, setHelpMenuOpen] = React.useState(false);
  // const [logOpen, setLogOpen] = React.useState(true);
  const isMobile = false; // this wil get modified later to adjust for window dimensions

  React.useEffect(() => {
    if (!auth) {
      authUser();
    } else {
      if (!apps.length && !appsLoading) getApps();
      // if (!changeLog && !logLoading) getChangeLog();
    }
  }, [auth, apps, appsLoading]);

  return (
    <Menu fixed="top" inverted color="blue" size="tiny">
      <Link to="/" className="normal item">
        {/* <Icon name="image outline" size="large" /> */}
        {/* <img
          src={Logo}
          alt="logo"
          style={{ height: "8rem", width: "8rem", marginRight: "10px" }}
        /> */}
        <Header as="h4" style={{ color: "white" }}>
          PrePro Labs
        </Header>
      </Link>
      {helpMenuOpen && (
        <HelpMenu isOpen={helpMenuOpen} setOpen={setHelpMenuOpen} />
      )}
      {/* Removed changelog temporarily, showing up as a 0 for some reason */}
      {/* {changeLog && changeLog.length && (
        <ChangeLog
          logOpen={logOpen}
          setLogOpen={setLogOpen}
          changeLog={changeLog}
        />
      )} */}
      <Menu.Item position="right">
        {auth ? (
          <Button
            basic
            inverted
            style={{ marginRight: "3px" }}
            onClick={() => setHelpMenuOpen(true)}
          >
            <Icon name="question circle" />
            {isMobile ? "" : "Help"}
          </Button>
        ) : null}
        <Button
          style={isMobile ? { marginLeft: "10px" } : { marginLeft: "0px" }}
          basic
          inverted
          href="/logout"
        >
          <Icon name="log out" />
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

export default connect(mapStateToProps, { authUser, getApps })(Navbar);
