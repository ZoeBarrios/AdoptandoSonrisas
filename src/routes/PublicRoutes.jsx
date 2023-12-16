import { Route } from "wouter";
import Home from "../pages/Home/Home";
import Cases from "../pages/Cases/Cases";
import Case from "../pages/Case/Case";
import Adopt from "../pages/Adoptions/Adopt";
import Animal from "../pages/Animal/Animal";
import FormRegisterOrganizartion from "../components/formOrganization/FormRegisterOrganization";
import Organization from "../pages/Organization/Organization";
import Donar from "../pages/Donar/Donar";
import Volunteers from "../pages/Volunteers/Volunteers";
import FormLogin from "../components/formLogin/FormLogin";
export default function PublicRoutes() {
  return (
    <>
      <Route path="/" component={Home} />
      <Route path="/casos" component={Cases} />
      <Route path="/casos/:id" component={Case} />
      <Route path="/adoptar" component={Adopt} />
      <Route path="/adoptar/:id" component={Animal} />
      <Route
        path="/register/organizacion"
        component={FormRegisterOrganizartion}
      />
      <Route path="/organizacion/:id" component={Organization} />
      <Route path="/donar" component={Donar} />
      <Route path="/donar/:id" component={Donar} />
      <Route path="/register" component={Volunteers} />
      <Route path="/login" component={FormLogin} />
    </>
  );
}
