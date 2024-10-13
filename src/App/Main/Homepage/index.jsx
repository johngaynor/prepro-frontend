import React from "react";
import Dashboard from "./dashboard";
import Spinner from "../components/Spinner";
import { connect } from "react-redux";

const Homepage = ({ startsWith, userLoading, auth, appsLoading }) => {
  if (userLoading || appsLoading) {
    return <Spinner />;
  }
  if (!auth) {
    return (
      <div>
        <div
          className="ui sticky fixed"
          style={{ width: "70%", marginLeft: "12.5%" }}
        ></div>
        <div className="home-hero">
          <div className="home-text">
            <div
              className="ui secondary segment padded center aligned"
              id="homePage"
            >
              <h1>Welcome to ___</h1>
              <h4>Please login with your Google email to continue.</h4>
              <a
                className="ui button blue"
                href="/auth/google"
                style={{ marginBottom: "20px" }}
              >
                <strong> Login </strong>
              </a>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Dashboard startsWith={startsWith} />;
  }
};

function mapStateToProps(state) {
  return {
    userLoading: state.app.userLoading,
    auth: state.app.auth,
    appsLoading: state.app.appsLoading,
  };
}

export default connect(mapStateToProps)(Homepage);
