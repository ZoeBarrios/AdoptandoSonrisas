import {  Route } from "wouter";
import Profile from "../pages/Profile/Profile";
import User from "../pages/User/User";
import Admins from "../pages/Admins/Admins";

export default function UsersRouters() {
  return (
    <>
      <Route path="/perfil" component={Profile} />
      <Route path="/usuario/:id" component={User} />

      <Route path="/organizacion/admins/:id" component={Admins} />
    </>
  );
}
