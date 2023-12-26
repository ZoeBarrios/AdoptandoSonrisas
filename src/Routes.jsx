import { Redirect, Route, Router } from "wouter";
import useAuthStore from "./stores/useAuthStore";
import PublicRoutes from "./routes/PublicRoutes";
import UsersRouters from "./routes/UsersRoutes";
export default function Routes() {
  const { isAuthenticated } = useAuthStore();
  return (
    <Router>
      {isAuthenticated && <UsersRouters />}
      <PublicRoutes />
      <Redirect to="/" />
    </Router>
  );
}
