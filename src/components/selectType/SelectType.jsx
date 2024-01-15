import { ErrorMessage } from "formik";
import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";
export default function SelectType({ onChange, defaultValue }) {
  const { language } = useLanguageStore();

  return (
    <>
      <select
        defaultValue={defaultValue}
        name="type"
        onChange={onChange}
        className="w-9/12 text-center border rounded-md p-2 mt-1 border-orange active:border-darkOrange focus:border-orange"
      >
        <option value="" disabled>
          {TRANSLATES[language].FILTERS.TYPE}
        </option>
        <option value="DOG">{TRANSLATES[language].TYPES.DOG}</option>
        <option value="CAT">{TRANSLATES[language].TYPES.CAT}</option>
      </select>
      <ErrorMessage name="type">
        {(msg) => <p className="text-red-500 font-bold">{msg}</p>}
      </ErrorMessage>
    </>
  );
}
