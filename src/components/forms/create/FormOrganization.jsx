import { useState } from "react";
import FormRegisterOrganizartion from "./FormRegisterOrganization";
import BackButton from "../../backButton/BackButton";

export default function FormRegister() {
  const [form, setForm] = useState(true);
  const toggleForm = () => setForm(!form);
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-orange">
      <BackButton />

      <FormRegisterOrganizartion toggleForm={toggleForm} />
    </div>
  );
}
