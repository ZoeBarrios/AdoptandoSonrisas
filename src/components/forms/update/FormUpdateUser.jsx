import Loader from "../../loader/Loader";
import { Form, Formik } from "formik";
import FormField from "../../formField/FormField";
import useUpdateForm from "../../../hooks/useUpdateForm";
import ChangePasswordInput from "../../changePasswordInput/ChangePasswordInput";
import useLanguageStore from "../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../utils/languajes";
import { useUpdateUser } from "../../../hooks/mutations/person/useUpdateUser";
import { usePerson } from "../../../hooks/querys/person/usePerson";

export default function FormUpdateUser({ user }) {
  const { language } = useLanguageStore();
  const { userData, isLoading, refetch } = usePerson(user.id);
  const { mutate } = useUpdateUser(refetch);

  const { isEditable, setFormRef, handleUpdate, handleEdit } = useUpdateForm(
    mutate,
    userData
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className="bg-white p-5 mt-5 shadow-card w-10/12 md:w-7/12  rounded-lg flex flex-col items-center justify-center"
          style={{ maxWidth: "80%" }}
        >
          <h2 className="title">
            {TRANSLATES[language].FORMS.UPDATE_USER.TITLE}
          </h2>
          <Formik
            initialValues={userData}
            onSubmit={handleUpdate}
            enableReinitialize={true}
          >
            {({ setValues }) => {
              setFormRef.current = setValues;
              return (
                <Form className="mt-5 w-full gap-5 md:gap-2 flex flex-row items-center justify-center flex-wrap">
                  <FormField
                    type="text"
                    label={TRANSLATES[language].LABELS.NAME}
                    name="name"
                    disabled={!isEditable}
                  />
                  <FormField
                    type="text"
                    label={TRANSLATES[language].LABELS.SURNAME}
                    name="surname"
                    disabled={!isEditable}
                  />
                  <FormField
                    type="text"
                    label={TRANSLATES[language].LABELS.EMAIL}
                    name="email"
                    disabled={!isEditable}
                  />
                  <FormField
                    type="text"
                    label={TRANSLATES[language].LABELS.PHONE}
                    name="phone"
                    disabled={!isEditable}
                  />
                  <div
                    className="flex flex-col items-center justify-center"
                    style={{ width: "30rem" }}
                  >
                    <ChangePasswordInput email={userData.email} />
                    <div className="flex flex-row-reverse items-center justify-between w-full ">
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
