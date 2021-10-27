import { Route } from "react-router-dom";
import { useHistory } from "react-router";
import { roles } from "helpers/data";
import { paths } from "./paths";
import { Fragment } from "react";

const PrivateRoute = ({ children, allowed, ...props }) => {
  const history = useHistory();
  const token = localStorage.getItem("access_token");
  if (allowed === roles.GUEST && token) {
    history.push(paths.search);
  } else if (allowed === roles.SIMPLE && !token) {
    history.push(paths.login);
  } else {
    return <Route {...props}>{children}</Route>;
  }
  return <Fragment />;
};

export default PrivateRoute;
