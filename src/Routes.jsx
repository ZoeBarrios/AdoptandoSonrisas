import { Router, Route, Switch } from "wouter";
import App from "./App";
export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={App} />
        {/*<Route path="/casos" component={Casos} />
        <Route path="/adoptar" component={Adoptar} />
        <Route path="/donar" component={Donar} />
        <Route path="/voluntarios" component={Voluntarios} />
  */}
      </Switch>
    </Router>
  );
}
