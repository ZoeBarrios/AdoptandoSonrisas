import { ErrorMessage } from "formik";
import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";

export default function YearInput() {
  const { language } = useLanguageStore();
  return (
    <div className="w-full flex flex-col items-center">
      <label
        htmlFor="birthdate"
        className="w-9/12 text-base font-bold text-darkOrange text-start"
      >
        {TRANSLATES[language].LABELS.DATEBIRTH}
      </label>
      <input
        type="date"
        id="birthdate"
        className="border rounded-md p-2 mt-1 w-9/12 text-center border-orange active:border-darkOrange focus:border-orange"
        max={new Date().toISOString().split("T")[0]}
        defaultValue={new Date().toISOString().split("T")[0]}
      />
      <ErrorMessage
        name="birthdate"
        component="div"
        className="text-red-500 font-bold"
      />
    </div>
  );
}
