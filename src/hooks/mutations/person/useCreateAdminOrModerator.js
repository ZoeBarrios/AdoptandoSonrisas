import { useMutation } from "react-query";
import { createAdminOrModerator } from "../../../services/user";
import { showSuccess } from "../../../utils/userMessages";
import { TRANSLATES } from "../../../utils/languajes";
import { toast } from "react-toastify";
import useLanguageStore from "../../../stores/useLanguageStore";

export function useCreateAdminOrModerator(refetch, closeModal, role) {
  const { language } = useLanguageStore();

  const { mutate, isLoading } = useMutation(createAdminOrModerator, {
    onSuccess: () => {
      showSuccess(
        `${
          TRANSLATES[language].MESSAGES.NEW_USER.SUCCESS
        } ${role.toLowerCase()} `,
        refetch
      );
      closeModal();
    },
  });

  const handleCreateAdminOrModerator = (values, { setSubmitting }) => {
    mutate(
      {
        person: { ...values },
        role,
      },
      {
        onError: (error) => {
          if (error.status == 400) {
            toast.error(
              TRANSLATES[language].MESSAGES.REGISTER.USER_ALREADY_EXISTS
            );
          } else toast.error(TRANSLATES[language].MESSAGES.NEW_USER.ERROR);
          setSubmitting(false);
        },
      }
    );
  };
  return { handleCreateAdminOrModerator, isLoading };
}
