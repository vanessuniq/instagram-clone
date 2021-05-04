// use suspense for the page to fall back to a loader when fetching data and promise has not resolved
import { lazy, Suspense } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LOGIN, SIGN_UP } from "./constants/routes";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

function App() {
  return (
    <div>
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
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
