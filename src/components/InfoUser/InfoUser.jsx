import { useState } from "react";
import useAuthStore from "../../stores/useAuthStore";
import { ROLES } from "../../utils/constants";
import FormUpdateOrganization from "../forms/update/FormUpdateOrganization";
import FormUpdateUser from "../forms/update/FormUpdateUser";
import { useMutation } from "react-query";
import { useLocation } from "wouter";
import { useAuth } from "../../hooks/useAuth";
import { deletePersonAccount } from "../../services/user";
import { showError } from "../../utils/userMessages";
import Modal from "../modal/Modal";
import useModal from "../../hooks/useModal";
import useLanguageStore from "../../stores/useLanguageStore";
import { LANGUAGES, TRANSLATES } from "../../utils/languajes";

export default function InfoUser({ data, refetch }) {
  const { user } = useAuthStore();
  const { language } = useLanguageStore();
  const { handleLogout } = useAuth();
  const [showOrgForm, setShowOrgForm] = useState(false);
  const { showModal, closeModal, openModal } = useModal();
  const [__, setLocation] = useLocation();
  const { mutate } = useMutation(deletePersonAccount, {
    onSuccess: () => {
      handleLogout();
      setLocation("/");
    },
    onError: showError,
  });

  const handleDeleteAccount = () => {
    mutate(user.id);
  };

  const handleClicked = () => {
    setShowOrgForm(!showOrgForm);
  };

  const formToRender =
    user.role === ROLES.ADMIN ? (
      showOrgForm ? (
        <FormUpdateOrganization data={data} refetch={refetch} />
      ) : (
        <FormUpdateUser user={user} />
      )
    ) : (
      <FormUpdateUser user={user} />
    );

  return (
    <section className="flex-container h-full">
      {user.role === ROLES.ADMIN ? (
        <>
          <div className="flex flex-col items-center">{formToRender}</div>
          <button
            onClick={handleClicked}
            className="absolute top-0 left-50  md:right-1 button-style mt-2 px-2 md:px-5 py-2 text-base"
          >
            {TRANSLATES[language].BUTTONS.UPDATE}{" "}
            {showOrgForm
              ? language == LANGUAGES.ES
                ? "mi perfil"
                : "my profile"
              : "org"}
          </button>
        </>
      ) : (
        <FormUpdateUser user={user} />
      )}

      <button
        className="absolute bottom-5 right-1/2 md:right-5 delete-button"
        onClick={openModal}
      >
        <i className="fa-solid fa-trash"></i>{" "}
        {TRANSLATES[language].INFO_USER.DELETE_ACCOUNT}
      </button>
      <Modal isOpen={showModal} setClose={closeModal}>
        <div className="flex flex-col items-center justify-center p-5">
          <h1 className="title">{TRANSLATES[language].INFO_USER.WARNING}</h1>
          <div className="w-full flex flex-row justify-around">
            <button
              className="button-style mt-2 px-2 md:px-5 py-2 text-base"
              onClick={handleDeleteAccount}
            >
              {TRANSLATES[language].BUTTONS.YES}
            </button>
            <button
              className="button-style mt-2 px-2 md:px-5 py-2 text-base"
              onClick={closeModal}
            >
              {TRANSLATES[language].BUTTONS.CANCEL}
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
