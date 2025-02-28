import React, { useEffect } from "react";
import { Menu, Button, Icon, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import HelpMenu from "../HelpMenu";
import { connect } from "react-redux";
import { isMobile } from "../../customHooks";
// actions
import { authUser, getApps } from "../../actions";
import { getSleepLogs } from "../../sleep/actions";
import { getWeightLogs } from "../../nutrition/actions";
import {
  getSupplements,
  getSupplementLogs,
} from "../../nutrition/supplements/actions";
import { getCheckIns } from "../../checkIns/actions";

const Navbar = ({
  authUser,
  auth,
  apps,
  appsLoading,
  getApps,
  sleepLogs,
  sleepLogsLoading,
  getSleepLogs,
  weightLogs,
  weightLogsLoading,
  getWeightLogs,
  supplements,
  supplementsLoading,
  getSupplements,
  supplementLogs,
  supplementLogsLoading,
  getSupplementLogs,
  checkIns,
  checkInsLoading,
  getCheckIns,
}) => {
  const [helpMenuOpen, setHelpMenuOpen] = React.useState(false);

  useEffect(() => {
    if (!auth) {
      authUser();
    } else {
      if (!apps.length && !appsLoading) getApps();
      // pre-fetching other stuff
      if (!sleepLogs && !sleepLogsLoading) getSleepLogs();
      if (!weightLogs && !weightLogsLoading) getWeightLogs();
      if (!supplements && !supplementsLoading) getSupplements();
      if (!supplementLogs && !supplementLogsLoading) getSupplementLogs();
      if (!checkIns && !checkInsLoading) getCheckIns();
    }
  }, [
    auth,
    apps,
    appsLoading,
    getApps,
    sleepLogs,
    sleepLogsLoading,
    getSleepLogs,
    weightLogs,
    weightLogsLoading,
    getWeightLogs,
    supplements,
    supplementsLoading,
    getSupplements,
    supplementLogs,
    supplementLogsLoading,
    getSupplementLogs,
    checkIns,
    checkInsLoading,
    getCheckIns,
  ]);

  return (
    <Menu fixed="top" inverted color="blue" size="tiny" secondary>
      <Link to="/" className="normal item">
        <Header as="h4" style={{ color: "white" }}>
          PrePro Labs
        </Header>
      </Link>
      {helpMenuOpen && (
        <HelpMenu isOpen={helpMenuOpen} setOpen={setHelpMenuOpen} />
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
            Help
          </Button>
        ) : null}
        <Button
          style={isMobile ? { marginLeft: "10px" } : { marginLeft: "0px" }}
          basic
          inverted
          href="/logout"
        >
          <Icon name="log out" />
          Logout
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
    sleepLogs: state.sleep.logs,
    sleepLogsLoading: state.sleep.logsLoading,
    weightLogs: state.nutrition.weightLogs,
    weightLogsLoading: state.nutrition.logsLoading,
    supplements: state.supplements.supplements,
    supplementsLoading: state.supplements.supplementsLoading,
    supplementLogs: state.supplements.logs,
    supplementLogsLoading: state.supplements.logsLoading,
    checkIns: state.checkIns.checkIns,
    checkInsLoading: state.checkIns.checkInsLoading,
  };
}

export default connect(mapStateToProps, {
  authUser,
  getApps,
  getSleepLogs,
  getWeightLogs,
  getSupplements,
  getSupplementLogs,
  getCheckIns,
})(Navbar);
