import { useMutation } from "react-query";
import { deletePersonAccount } from "../../../services/user";
import { useAuth } from "../../useAuth";
import { useLocation } from "wouter";
import { showError } from "../../../utils/userMessages";

export function useDeletePerson(id) {
  const { handleLogout } = useAuth();
  const [__, setLocation] = useLocation();
  const { mutate } = useMutation(deletePersonAccount, {
    onSuccess: () => {
      handleLogout();
      setLocation("/");
    },
    onError: showError,
  });

  const handleDeleteAccount = () => {
    mutate(id);
  };
  return { handleDeleteAccount };
}
