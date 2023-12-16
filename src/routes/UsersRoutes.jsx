import { Redirect, Route } from "wouter";
import Profile from "../pages/Profile/Profile";

export default function UsersRouters() {
  return (
    <>
      <Route path="/perfil" component={Profile} />
      <Route>
        <Redirect to="/" />
      </Route>
    </>
  );
}
