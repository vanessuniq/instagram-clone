// use suspense for the page to fall back to a loader when fetching data and promise has not resolved
import { lazy, Suspense } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { DASHBOARD, LOGIN, NOT_FOUND, SIGN_UP } from "./constants/routes";
import UserContext from "./context/UserContext";
import useAuthListener from "./hooks/useAuthListener";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  const { user } = useAuthListener();
  return (
    <UserContext.Provider value={user}>
      <Router>
        <Suspense fallback={
          <SkeletonTheme color="#3f0f0f" highlightColor="#202020">
            <Skeleton circle={true} height={100}/>
          </SkeletonTheme>}>
          <Switch>
            <Route exact path={LOGIN}>
              <Login/>
            </Route>
            <Route exact path={SIGN_UP}>
              <Signup/>
            </Route>
            <Route exact path={NOT_FOUND}>
              <NotFound/>
            </Route>
            <Route exact path={DASHBOARD}>
              <Dashboard/>
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
