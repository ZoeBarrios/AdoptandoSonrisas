import { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getUserById, updateUser } from "../../services/user";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import { Form, Formik } from "formik";
import FormField from "../formField/FormField";

export default function FormUpdateUser({ user }) {
  const set = useRef(null);
  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery(["user"], () => getUserById(Number(user.id)), {
    onError: async (error) => {
      const { message } = await error.response.json();
      toast.error(message);
    },
  });
  const { mutate } = useMutation(updateUser, {
    onSuccess: () => {
      toast.success("Usuario actualizado");
      refetch();
    },
    onError: async (error) => {
      const { message } = await error.json();
      toast.error(message);
    },
  });

  const [isEditable, setIsEditable] = useState(false);

  const handleUpdate = (values, { setSubmitting, setValues }) => {
    mutate({ ...values, id: userData.id });
    refetch();
    setSubmitting(false);
    setIsEditable(false);
    setValues({ ...values });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditable(!isEditable);
    set.current({ ...userData });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-white p-5 shadow-card w-6/12 rounded-lg flex flex-col items-center justify-center">
          <h2 className="font-bold text-darkOrange text-xl">Mi información</h2>
          <Formik initialValues={userData} onSubmit={handleUpdate}>
            {({ setValues }) => {
              set.current = setValues;
              return (
                <Form className="w-full flex flex-col items-center">
                  <FormField
                    type="text"
                    label="Nombre"
                    name="name"
                    disabled={!isEditable}
                  />
                  <FormField
                    type="text"
                    label="Apellido"
                    name="surname"
                    disabled={!isEditable}
                  />
                  <FormField
                    type="text"
                    label="Email"
                    name="email"
                    disabled={!isEditable}
                  />
                  <FormField
                    type="text"
                    label="Teléfono"
                    name="phone"
                    disabled={!isEditable}
                  />

                  <button onClick={handleEdit}>
                    {isEditable ? "Volver" : "Editar"}
                  </button>
                  {isEditable && <button type="submit">Guardar</button>}
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
    </>
  );
}
