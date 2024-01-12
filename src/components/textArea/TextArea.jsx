import { ErrorMessage, Field } from "formik";

export default function TextArea({
  isEditable = true,
  label,
  name,
  isRequired = false,
}) {
  return (
    <div className="flex flex-col w-full items-center">
      <label
        className="w-9/12 text-right font-bold text-darkOrange text-start"
        htmlFor={name}
      >
        {label}
      </label>
      <Field
        as="textarea"
        id={name}
        name={name}
        disabled={!isEditable}
        className="w-9/12 h-16 input resize-none"
      />
      {isRequired && (
        <div className="h-2 text-start w-9/12">
          <ErrorMessage
            name={name}
            component="div"
            className="text-red-500 font-bold"
          />
        </div>
      )}
    </div>
  );
}
