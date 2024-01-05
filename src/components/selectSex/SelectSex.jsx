import { ErrorMessage } from "formik";
import { GENDERS } from "../../utils/constants";
import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";

export default function SelectSex({ defaultValue, onChange }) {
  const { language } = useLanguageStore();
  return (
    <>
      <select
        defaultValue={defaultValue}
        name="sex"
        onChange={onChange}
        className="w-9/12 text-center border rounded-md p-2 mt-1 border-orange active:border-darkOrange focus:border-orange"
      >
        <option value="" disabled>
          {TRANSLATES[language].FILTERS.SEX}
        </option>
        <option value={GENDERS.F}>{TRANSLATES[language].SEX.FEMALE}</option>
        <option value={GENDERS.M}>{TRANSLATES[language].SEX.MALE}</option>
      </select>
      <ErrorMessage name="sex">
        {(msg) => <p className="text-red-500 font-bold">{msg}</p>}
      </ErrorMessage>
    </>
  );
}
