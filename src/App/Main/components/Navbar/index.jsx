import React, { useEffect, useState } from "react";
import { Menu, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import HelpMenu from "../HelpMenu";
import Logo from "../../../images/logo-3.png";
import { apiCall } from "../../../services/api";
import { toast } from "react-hot-toast";
import AppContext from "../Context/appContext";
import ChangeLog from "../ChangeLog";

const Navbar = ({}) => {
  const [helpMenuOpen, setHelpMenuOpen] = useState(false);
  const [logOpen, setLogOpen] = useState(true);
  const isMobile = false; // this wil get modified later to adjust for window dimensions

  const {
    user,
    setUser,
    setUserLoading,
    auth,
    setAuth,
    apps,
    setApps,
    appsLoading,
    setAppsLoading,
    changeLog,
    logLoading,
    getChangeLog,
  } = React.useContext(AppContext);

  function authUser() {
    apiCall("get", "/api/auth/user", { credentials: "include" })
      .then((res) => {
        if (res.user) {
          setUserLoading(false);
          setAuth(true);
          setUser(res.user);
        } else {
          toast.error("Unknown error occurred...");
          setUser({});
        }
      })
      .catch((err) => {
        toast.error(`Error authenticating user: ${err}`);
      });
  }

  function getApps() {
    setAppsLoading(true);
    apiCall("get", "/api/dashboard/apps")
      .then((res) => {
        setApps(res.result);
      })
      .catch((err) => {
        toast.error(`Error getting user apps: ${err}`);
      });
    setAppsLoading(false);
  }

  useEffect(() => {
    if (!auth) {
      if (apps.length) {
        setApps([]);
      }
      authUser();
    } else {
      if (!apps.length && !appsLoading) getApps();
      if (!changeLog && !logLoading) getChangeLog();
    }
  }, [auth, authUser]);

  return (
    <Menu fixed="top" inverted color="blue" size="tiny">
      <Link to="/" className="normal item">
        {/* <Icon name="image outline" size="large" /> */}
        {/* <img
          src={Logo}
          alt="logo"
          style={{ height: "8rem", width: "8rem", marginRight: "10px" }}
        /> */}
      </Link>
      {helpMenuOpen && (
        <HelpMenu isOpen={helpMenuOpen} setOpen={setHelpMenuOpen} />
      )}
      {changeLog && changeLog.length && (
        <ChangeLog
          logOpen={logOpen}
          setLogOpen={setLogOpen}
          changeLog={changeLog}
        />
      )}
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

export default Navbar;
