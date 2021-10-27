import NotFoundPage from "pages/NotFoundPage/NotFoundPage";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { routes } from "routes";
import PrivateRoute from "routes/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map(({ Component, ...props }, index) => (
          <PrivateRoute {...props} key={index}>
            {Component}
          </PrivateRoute>
        ))}
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
