import { useLocation } from "wouter";
import loginImg from "/imgs/login.avif";
import { Formik } from "formik";
import { loginValidationSchema } from "../../../validationSchemas/validationSchemas";
import Loader from "../../loader/Loader";
import FormField from "../../formField/FormField";
import FormBase from "../../formBase/FormBase";
import BackButton from "../../backButton/BackButton";
import Recover from "../../recover/Recover";
import useModal from "../../../hooks/useModal";
import useLanguageStore from "../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../utils/languajes";
import { useLogin } from "../../../hooks/mutations/auth/useLogin";

export default function FormLogin() {
  const { language } = useLanguageStore();
  const [__, setLocation] = useLocation();
  const { handleSubmit, isLoading } = useLogin();
  const { showModal, openModal, closeModal } = useModal();

  const initialValues = {
    nameOrEmail: "",
    password: "",
  };

  const handleVolunteer = () => {
    setLocation("/register");
  };
  const handleOrganization = () => {
    setLocation("/register/organizacion");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-orange">
      <BackButton />
      <Formik
        initialValues={initialValues}
        validationSchema={() => loginValidationSchema(language)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <FormBase>
            <div className="w-full h-3/6 md:h-auto flex flex-col items-center justify-center gap-5">
              <FormField
                type="text"
                label={TRANSLATES[language].LABELS.EMAILORUSER}
                name="nameOrEmail"
              />

              <FormField
                type="password"
                label={TRANSLATES[language].LABELS.PASSWORD}
                name="password"
              />

              <Recover
                showModal={showModal}
                closeModal={closeModal}
                openModal={openModal}
              />

              <div className="flex flex-col w-full items-center justify-center">
                <button
                  type="submit"
                  className="font-bold text-xl p-3 w-8/12 bg-darkOrange rounded text-white mt-5 hover:bg-orange hover:transition-colors duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader isButtonLoader={true} />
                  ) : (
                    TRANSLATES[language].NAV.LOGIN
                  )}
                </button>
                <a
                  className="text-base text-start cursor-pointer text-darkOrange"
                  onClick={openModal}
                >
                  {TRANSLATES[language].LABELS.FORGOT_PASSWORD}
                </a>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 mt-10 w-full">
                <a
                  onClick={handleOrganization}
                  className="text-base text-black cursor-pointer hover:text-darkOrange"
                >
                  {TRANSLATES[language].BUTTONS.REGISTER_ORGANIZATION}
                </a>
                <a
                  onClick={handleVolunteer}
                  className="text-base text-blacke cursor-pointer hover:text-darkOrange"
                >
                  {TRANSLATES[language].BUTTONS.REGISTER}
                </a>
              </div>
            </div>
            <div className="w-full h-2/5 hidden md:block md:w-full md:h-full overflow-hidden">
              <img
                src={loginImg}
                alt="register"
                className="w-full h-full object-cover object-center rounded"
              />
            </div>
          </FormBase>
        )}
      </Formik>
    </div>
  );
}
