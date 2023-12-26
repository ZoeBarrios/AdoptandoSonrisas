import { Form, Formik } from "formik";
import FormField from "../formField/FormField";
import { useMutation } from "react-query";
import {
  createFinancialInfo,
  updateFinancialInfo,
} from "../../services/financialInfo";
import useUpdateForm from "../../hooks/useUpdateForm";
import { showError, showSuccess } from "../../utils/userMessages";

export default function FinancialForm({
  update = false,
  financialInfo = {
    name: "",
    alias: "",
    mp_link: "",
  },
  organization = 0,
  refetch,
}) {
  const initialValues = update
    ? {
        ...financialInfo,
        organization_id: organization,
      }
    : financialInfo;
  const { mutate } = useMutation(
    (params) =>
      update ? updateFinancialInfo(params) : createFinancialInfo(params),
    {
      onSuccess: () => {
        showSuccess("Se ha actualizado la información financiera", refetch);
      },
      onError: showError,
    }
  );
  const { isEditable, setFormRef, handleUpdate, handleEdit } = useUpdateForm(
    mutate,
    initialValues
  );

  return (
    <Formik initialValues={initialValues} onSubmit={handleUpdate}>
      {({ values, setValues }) => {
        setFormRef.current = setValues;
        return (
          <Form className="flex flex-col w-full items-center justify-around h-5/6">
            <FormField
              name="cbu"
              label="Cbu"
              type="text"
              disabled={!isEditable}
            />
            <FormField
              name="alias"
              label="Alias"
              type="text"
              disabled={!isEditable}
            />
            <FormField
              name="mp_link"
              label="Link de Mercado Pago"
              type="text"
              disabled={!isEditable}
            />
            {update ? (
              <div className="flex flex-row-reverse w-9/12 items-center justify-between">
                {isEditable && (
                  <button type="submit" className="buttons-form">
                    Actualizar
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleEdit}
                  className="buttons-form"
                >
                  {isEditable ? "Cancelar" : "Editar"}
                </button>
              </div>
            ) : (
              <button type="submit" className="buttons-form">
                Crear
              </button>
            )}
          </Form>
        );
      }}
    </Formik>
  );
}
