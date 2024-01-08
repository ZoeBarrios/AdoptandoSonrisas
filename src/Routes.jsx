import { Redirect, Route, Router } from "wouter";
import useAuthStore from "./stores/useAuthStore";
import PublicRoutes from "./routes/PublicRoutes";
import UsersRouters from "./routes/UsersRoutes";
import Reset from "./pages/Reset/Reset";
export default function Routes() {
  const { isAuthenticated } = useAuthStore();
  return (
    <Router>
      <Route path="/reset/:token" component={Reset} />
      {isAuthenticated && <UsersRouters />}
      <PublicRoutes />
    </Router>
  );
}
