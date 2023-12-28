import { ErrorMessage } from "formik";
import { SIZES } from "../../utils/constants";

export default function SelectSize({ onChange, defaultValue }) {
  return (
    <>
      <select
        defaultValue={defaultValue}
        name="size"
        onChange={onChange}
        className="w-9/12 text-center border rounded-md p-2 mt-1 border-orange active:border-darkOrange focus:border-orange"
      >
        <option value="" disabled>
          Elige el tamaño
        </option>
        <option value={SIZES.SMALL}>Pequeño</option>
        <option value={SIZES.MEDIUM}>Mediano</option>
        <option value={SIZES.BIG}>Grande</option>
      </select>
      <ErrorMessage name="size">
        {(msg) => <p className="text-red-500 font-bold">{msg}</p>}
      </ErrorMessage>
    </>
  );
}
