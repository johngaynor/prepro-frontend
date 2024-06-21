import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Icon } from "semantic-ui-react";
import useAppStore from "../../../store";

const BreadCrumb = ({ path }) => {
  const { isAuthenticated } = useAppStore();
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
  if (isAuthenticated) {
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

export default BreadCrumb;
