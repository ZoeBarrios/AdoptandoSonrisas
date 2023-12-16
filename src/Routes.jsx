import { Route, Router } from "wouter";
import useAuthStore from "./stores/useAuthStore";
import PublicRoutes from "./routes/PublicRoutes";
import UsersRouters from "./routes/UsersRoutes";
import { ROLES } from "./utils/constants";
export default function Routes() {
  const { user, isAuthenticated } = useAuthStore();
  return (
    <Router>
      {isAuthenticated && user.role === ROLES.USER && <UsersRouters />}
      <PublicRoutes />

      <Route>Error</Route>
    </Router>
  );
}
