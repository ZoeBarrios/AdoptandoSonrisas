import { useMutation } from "react-query";
import { useParams } from "wouter";
import { changePassword } from "../../services/auth";
import { useLocation } from "wouter";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import FormField from "../../components/formField/FormField";
import useAuthStore from "../../stores/useAuthStore";
import { closeSession } from "../../utils/localStorageFunctions";

export default function Reset() {
  const { token } = useParams();
  const { logout } = useAuthStore();
  const [__, setLocation] = useLocation();
  const { mutate } = useMutation(changePassword, {
    onSuccess: () => {
      toast.success("Contraseña cambiada correctamente");
      logout();
      closeSession();
      setLocation("/");
    },
    onError: async (error) => {
      const { message } = await error.json();
      toast.error(message);
    },
  });

  const handleSubmit = (values, { setSubmitting }) => {
    mutate({ password: values.newPassword, token });
    setSubmitting(false);
  };

  const validate = (values) => {
    console.log(values);
    const errors = {};
    if (!values.newPassword) {
      errors.newPassword = "Campo obligatorio";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Campo obligatorio";
    } else if (values.confirmPassword !== values.newPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }
    return errors;
  };

  return (
    <Formik
      initialValues={{
        newPassword: "",
        confirmPassword: "",
      }}
      onSubmit={handleSubmit}
      validate={validate}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormField
            type="password"
            label="Nueva contraseña"
            name="newPassword"
          />
          <FormField
            type="password"
            label="Confirmar contraseña"
            name="confirmPassword"
          />
          <button type="submit">Cambiar contraseña</button>
        </Form>
      )}
    </Formik>
  );
}
