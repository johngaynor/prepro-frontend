import React, { useEffect, useState } from "react";
import { Menu, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useAuthUser, useGetApps } from "./actions";
import useAppStore from "../../../store";
import HelpMenu from "../HelpMenu";

const Navbar = ({}) => {
  const [helpMenuOpen, setHelpMenuOpen] = useState(false);
  const isMobile = false; // this wil get modified later to adjust for window dimensions

  const { isAuthenticated, apps, appsLoading, clearApps } = useAppStore();

  const authUser = useAuthUser();
  const getApps = useGetApps();

  useEffect(() => {
    if (!isAuthenticated) {
      if (apps.length) clearApps();
      authUser();
    } else if (!apps.length && !appsLoading) {
      getApps();
    }
  }, [isAuthenticated, authUser]);

  return (
    <Menu fixed="top" inverted color="blue" size="tiny">
      <Link to="/" className="normal item">
        <Icon name="image outline" size="large" />
      </Link>
      {helpMenuOpen && (
        <HelpMenu isOpen={helpMenuOpen} setOpen={setHelpMenuOpen} />
      )}
      <Menu.Item position="right">
        {isAuthenticated ? (
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
