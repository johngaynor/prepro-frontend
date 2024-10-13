import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Icon } from "semantic-ui-react";
import { connect } from "react-redux";

const BreadCrumb = ({ path, auth }) => {
  const routeParts = path.split("/");
  let crumbPath = "/";
  const filteredParts = routeParts.filter((part) => part !== "");
  const routeCrumb = filteredParts.map((part, i) => {
    crumbPath += part + "/";
    return (
      <Link to={crumbPath} key={i + part}>
        <Breadcrumb.Divider>
          <Icon name="angle right" />
        </Breadcrumb.Divider>
        <Breadcrumb.Section active={i === filteredParts.length - 1}>
          {part}
        </Breadcrumb.Section>
      </Link>
    );
  });
  if (auth) {
    return (
      <Breadcrumb style={{ paddingBottom: "10px" }}>
        <Link to="/">
          <Breadcrumb.Section active={filteredParts.length === 0}>
            Home
          </Breadcrumb.Section>
        </Link>
        {routeCrumb}
      </Breadcrumb>
    );
  } else {
    return <div />;
  }
};

function mapStateToProps(state) {
  return {
    auth: state.app.auth,
  };
}

export default connect(mapStateToProps)(BreadCrumb);
