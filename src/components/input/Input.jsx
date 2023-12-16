export default function Input({
  type,
  name,
  label,
  onChange,
  value,
  disabled = false,
}) {
  return (
    <div className="w-8/12 flex flex-col">
      <label htmlFor={name} className="text-base font-bold text-darkOrange">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        autoComplete="off"
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="py-2 px-4 bg-white rounded-md border border-darkOrange focus:outline-orange focus:ring-darkOrange focus:border-transparent transition duration-300 ease-in-out"
      />
    </div>
  );
}
