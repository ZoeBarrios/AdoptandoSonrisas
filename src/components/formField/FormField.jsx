import { ErrorMessage, Field } from "formik";
import Input from "../input/Input";

export default function FormField({ type, name, label, disabled }) {
  return (
    <>
      <Field
        type={type}
        name={name}
        as={Input}
        label={label}
        disabled={disabled}
      />
      <div className="h-5">
        <ErrorMessage name={name} component="div" className="text-red-500" />
      </div>
    </>
  );
}
