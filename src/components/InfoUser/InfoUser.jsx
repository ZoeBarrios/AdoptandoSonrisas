import useAuthStore from "../../stores/useAuthStore";
import FormUpdateUser from "../formUpdateUser/FormUpdateUser";

export default function InfoUser() {
  const { user } = useAuthStore();
  return (
    <section className="w-full flex flex-col items-center justify-center mb-10">
      <FormUpdateUser user={user} />
    </section>
  );
}
