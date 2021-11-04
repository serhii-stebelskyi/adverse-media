import { Route } from "react-router-dom";
import { useHistory } from "react-router";
import { roles } from "helpers/data";
import { paths } from "./paths";
import { Fragment } from "react";

const PrivateRoute = ({ children, allowed, ...props }) => {
  const history = useHistory();
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : {};
  if (user.type === roles.SIMPLE && allowed === roles.GUEST) {
    history.push(paths.search);
  } else {
    return <Route {...props}>{children}</Route>;
  }
  return <Fragment />;
};

export default PrivateRoute;
