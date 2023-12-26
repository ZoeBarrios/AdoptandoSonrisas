import { Redirect, Route } from "wouter";
import Profile from "../pages/Profile/Profile";
import User from "../pages/User/User";
import Reset from "../pages/Reset/Reset";
import Admins from "../pages/Admins/Admins";

export default function UsersRouters() {
  return (
    <>
      <Route path="/perfil" component={Profile} />
      <Route path="/usuario/:id" component={User} />
      <Route path="/reset/:token" component={Reset} />
      <Route path="/organizacion/admins/:id" component={Admins} />
      <Route>
        <Redirect to="/" />
      </Route>
    </>
  );
}
