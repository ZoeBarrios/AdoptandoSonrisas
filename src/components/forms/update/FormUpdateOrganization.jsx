import { useMutation } from "react-query";
import { updateOrganization } from "../../../services/organization";
import Loader from "../../loader/Loader";
import { Form, Formik } from "formik";
import FormField from "../../formField/FormField";
import useUpdateForm from "../../../hooks/useUpdateForm";
import { toast } from "react-toastify";
import TextArea from "../../textArea/TextArea";

export default function FormUpdateOrganization({ data, refetch }) {
  const { mutate } = useMutation(updateOrganization, {
    onSuccess: () => {
      toast.success("Organización actualizada");
      refetch();
    },
    onError: async (error) => {
      const { message } = await error.json();
      toast.error(message);
    },
  });
  const { setFormRef, handleUpdate, handleEdit, isEditable } = useUpdateForm(
    mutate,
    {
      ...data?.[0],
      instagram_link: data?.[0]?.instagram_link ?? "",
      facebook_link: data?.[0]?.facebook_link ?? "",
    }
  );

  return (
    <>
      {!data ? (
        <Loader />
      ) : (
        <div className="bg-white p-2 mt-5 shadow-card w-10/12 md:w-7/12  rounded-lg flex flex-col items-center justify-center">
          <h2 className="title mt-3">Mi organización</h2>
          <Formik
            initialValues={{
              ...data[0],
              instagram_link: data?.[0]?.instagram_link ?? "",
              facebook_link: data?.[0]?.facebook_link ?? "",
            }}
            onSubmit={handleUpdate}
          >
            {({ setValues }) => {
              setFormRef.current = setValues;
              return (
                <Form className="gap-5 md:gap-2 w-full flex flex-row items-center justify-center flex-wrap">
                  <TextArea
                    isEditable={isEditable}
                    label="Descripción"
                    name="description"
                  />
                  <FormField
                    type="phone"
                    label="Telefono"
                    name="phone"
                    disabled={!isEditable}
                  />
                  <FormField
                    type="email"
                    label="Email"
                    name="email"
                    disabled={!isEditable}
                  />
                  <FormField
                    type="text"
                    label="Instagram"
                    name="instagram_link"
                    disabled={!isEditable}
                  />
                  <FormField
                    type="text"
                    label="Facebook"
                    name="facebook_link"
                    disabled={!isEditable}
                  />
                  <div className="flex flex-row-reverse items-center justify-between w-8/12">
                    <button onClick={handleEdit} className="buttons-form">
                      {isEditable ? "Volver" : "Editar"}
                    </button>
                    {isEditable && (
                      <button type="submit" className="buttons-form">
                        Guardar
                      </button>
                    )}
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
    </>
  );
}
