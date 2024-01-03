import { useState } from "react";
import { ErrorMessage, Field } from "formik";

export default function FormField({ type, name, label, disabled, min, max }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === "password" && !showPassword ? "password" : "text";

  const inputProps = {
    type: inputType,
    name: name,
    label: label,
    disabled: disabled,
    className:
      "py-2 px-3 bg-white rounded-md border border-darkOrange focus:outline-orange focus:ring-darkOrange focus:border-transparent transition duration-300 ease-in-out flex-1",
    ...(type === "number" && min && max ? { min, max } : {}),
  };

  return (
    <div className="w-9/12 flex flex-col">
      <label htmlFor={name} className="text-base font-bold text-darkOrange">
        {label}
      </label>

      <div className="relative w-full flex flex-col">
        <Field {...inputProps} />

        {type === "password" && (
          <div className="flex justify-end absolute right-3 top-3">
            <button
              type="button"
              className="text-darkOrange text-sm font-bold focus:outline-orange "
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <i className="fa-solid fa-eye-slash"></i>
              ) : (
                <i className="fa-solid fa-eye"></i>
              )}
            </button>
          </div>
        )}
      </div>

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
