import { ErrorMessage, Field } from "formik";

export default function FormField({ type, name, label, disabled, min, max }) {
  const inputProps = {
    type: type,
    name: name,
    label: label,
    disabled: disabled,
    className:
      "py-2 px-3 bg-white rounded-md border border-darkOrange focus:outline-orange focus:ring-darkOrange focus:border-transparent transition duration-300 ease-in-out",
    ...(type === "number" && min && max ? { min, max } : {}),
  };
  return (
    <div className="w-9/12 flex flex-col">
      <label htmlFor={name} className="text-base font-bold text-darkOrange">
        {label}
      </label>
      <Field {...inputProps} />
      <div className="h-2">
        <ErrorMessage
          name={name}
          component="div"
          className="text-red-500 font-bold"
        />
      </div>
    </div>
  );
}
