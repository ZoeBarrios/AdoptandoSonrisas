import { Form, Formik } from "formik";
import FormField from "../formField/FormField";
import { useMutation } from "react-query";
import {
  createFinancialInfo,
  updateFinancialInfo,
} from "../../services/financialInfo";
import useUpdateForm from "../../hooks/useUpdateForm";
import { showError, showSuccess } from "../../utils/userMessages";
import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";

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
  const { language } = useLanguageStore();
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
        showSuccess(TRANSLATES[language].MESSAGES.UPDATE.SUCCESS, refetch);
      },
      onError: () => {
        showError(TRANSLATES[language].MESSAGES.UPDATE.ERROR);
      },
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
              label={TRANSLATES[language].LABELS.MP_LINK}
              type="text"
              disabled={!isEditable}
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
                {TRANSLATES[language].BUTTONS.UPDATE}
              </button>
            )}
          </Form>
        );
      }}
    </Formik>
  );
}
