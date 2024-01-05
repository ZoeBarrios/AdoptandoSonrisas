import { ErrorMessage } from "formik";
import { SIZES } from "../../utils/constants";
import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";

export default function SelectSize({ onChange, defaultValue }) {
  const { language } = useLanguageStore();
  return (
    <>
      <select
        defaultValue={defaultValue}
        name="size"
        onChange={onChange}
        className="w-9/12 text-center border rounded-md p-2 mt-1 border-orange active:border-darkOrange focus:border-orange"
      >
        <option value="" disabled>
          {TRANSLATES[language].FILTERS.SIZE}
        </option>
        <option value={SIZES.SMALL}>{TRANSLATES[language].SIZE.SMALL}</option>
        <option value={SIZES.MEDIUM}>{TRANSLATES[language].SIZE.MEDIUM}</option>
        <option value={SIZES.BIG}>{TRANSLATES[language].SIZE.BIG}</option>
      </select>
      <ErrorMessage name="size">
        {(msg) => <p className="text-red-500 font-bold">{msg}</p>}
      </ErrorMessage>
    </>
  );
}
