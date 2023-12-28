import { ErrorMessage } from "formik";
import { GENDERS } from "../../utils/constants";

export default function SelectSex({ defaultValue, onChange }) {
  return (
    <>
      <select
        defaultValue={defaultValue}
        name="sex"
        onChange={onChange}
        className="w-9/12 text-center border rounded-md p-2 mt-1 border-orange active:border-darkOrange focus:border-orange"
      >
        <option value="" disabled>
          Elige el sexo
        </option>
        <option value={GENDERS.F}>Hembra</option>
        <option value={GENDERS.M}>Macho</option>
      </select>
      <ErrorMessage name="sex">
        {(msg) => <p className="text-red-500 font-bold">{msg}</p>}
      </ErrorMessage>
    </>
  );
}
