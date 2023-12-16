import FormRegister from "../../components/formUsers/FormRegister";
import BackButton from "../../components/backButton/BackButton";

export default function Volunteers() {
  return (
    <section className="h-screen flex flex-col items-center justify-center bg-orange">
      <BackButton />
      <FormRegister />
    </section>
  );
}
