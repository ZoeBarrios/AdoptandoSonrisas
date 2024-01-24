import Loader from "../../loader/Loader";
import { Form, Formik } from "formik";
import FormField from "../../formField/FormField";
import useUpdateForm from "../../../hooks/useUpdateForm";
import TextArea from "../../textArea/TextArea";
import useLanguageStore from "../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../utils/languajes";
import { useUpdateOrganization } from "../../../hooks/mutations/organization/useUpdateOrganization";

export default function FormUpdateOrganization({ data, refetch }) {
  const { language } = useLanguageStore();
  const { mutate } = useUpdateOrganization(refetch);

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
          <h2 className="title mt-3">{data[0].name}</h2>
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
                    label={TRANSLATES[language].LABELS.DESCRIPTION}
                    name="description"
                  />
                  <FormField
                    type="phone"
                    label={TRANSLATES[language].LABELS.PHONE}
                    name="phone"
                    disabled={!isEditable}
                  />
                  <FormField
                    type="email"
                    label={TRANSLATES[language].LABELS.EMAIL}
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
                      {isEditable
                        ? TRANSLATES[language].BUTTONS.RETURN
                        : TRANSLATES[language].BUTTONS.UPDATE}
                    </button>
                    {isEditable && (
                      <button type="submit" className="buttons-form">
                        {TRANSLATES[language].BUTTONS.SAVE}
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
