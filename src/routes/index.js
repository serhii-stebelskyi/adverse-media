import { paths } from "./paths";
import LoginPage from "pages/LoginPage/LoginPage";
import SearchPage from "pages/SearchPage/SearchPage";
import { roles } from "helpers/data";

const { GUEST, SIMPLE } = roles;

export const routes = [
  {
    Component: <LoginPage />,
    path: paths.login,
    allowed: GUEST,
  },
  {
    Component: <SearchPage />,
    path: paths.search,
    exact: true,
    allowed: SIMPLE,
  },
];
