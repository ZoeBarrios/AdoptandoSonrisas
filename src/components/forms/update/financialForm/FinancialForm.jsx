import { Form, Formik } from "formik";
import FormField from "../../../formField/FormField";
import useUpdateForm from "../../../../hooks/useUpdateForm";
import useLanguageStore from "../../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../../utils/languajes";
import { useUpdateFinacialInfo } from "../../../../hooks/mutations/financialInfo/useUpdateFinancialInfo";

export default function FinancialForm({
  update = false,
  financialInfo = {
    cbu: "",
    alias: "",
    mp_link: "",
  },
  organization = 0,
  refetch,
}) {
  const { language } = useLanguageStore();
  const initialValues = {
    ...financialInfo,
    organization_id: organization,
  };
  const { mutate } = useUpdateFinacialInfo(update, refetch);

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
              disabled={update ? !isEditable : false}
            />
            <FormField
              name="alias"
              label="Alias"
              type="text"
              disabled={update ? !isEditable : false}
            />
            <FormField
              name="mp_link"
              label={TRANSLATES[language].LABELS.MP_LINK}
              type="text"
              disabled={update ? !isEditable : false}
            />
            {update ? (
              <div className="flex flex-row-reverse w-9/12 items-center justify-between">
                {isEditable && (
                  <button type="submit" className="buttons-form">
                    {TRANSLATES[language].BUTTONS.UPDATE}
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleEdit}
                  className="buttons-form"
                >
                  {isEditable
                    ? TRANSLATES[language].BUTTONS.RETURN
                    : TRANSLATES[language].BUTTONS.UPDATE}
                </button>
              </div>
            ) : (
              <button type="submit" className="buttons-form">
                {TRANSLATES[language].BUTTONS.CREATE}
              </button>
            )}
          </Form>
        );
      }}
    </Formik>
  );
}
