import { useMutation } from "react-query";
import {
  createFinancialInfo,
  updateFinancialInfo,
} from "../../../services/financialInfo";
import { showError, showSuccess } from "../../../utils/userMessages";
import { TRANSLATES } from "../../../utils/languajes";
import useLanguageStore from "../../../stores/useLanguageStore";

export function useUpdateFinacialInfo(update, refetch) {
  const { language } = useLanguageStore();
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
  return { mutate };
}
