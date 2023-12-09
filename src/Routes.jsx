import { Router, Route, Switch } from "wouter";
import Home from "./pages/Home/Home";
import Cases from "./pages/Cases/Cases";
import Case from "./pages/Case/Case";
import Adopt from "./pages/Adoptions/Adopt";
export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/casos" component={Cases} />
        <Route path="/casos/:id" component={Case} />
        <Route path="/adoptar" component={Adopt} />
        {/*<Route path="/donar" component={Donar} />
        <Route path="/voluntarios" component={Voluntarios} />
  */}
      </Switch>
    </Router>
  );
}
