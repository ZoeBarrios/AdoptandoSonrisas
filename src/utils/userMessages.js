import { toast } from "react-toastify";

export const showError = async (error) => {
  const { message } = await error.json();
  toast.error(message);
};

export const showSuccess = async (message, refetch) => {
  toast.success(message);
  if (refetch) {
    refetch();
  }
};
