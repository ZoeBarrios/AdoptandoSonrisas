export default function DropDown({
  name,
  onChange,
  value,
  defaultValue,
  options,
  defaultDisables = true,
}) {
  const attributes = defaultDisables
    ? {
        value: value,
      }
    : {
        defaultValue: defaultValue,
      };

  return (
    <select name={name} onChange={onChange} {...attributes}>
      <option value="" disabled={defaultDisables}>
        {defaultValue}
      </option>
      {options.map((option, index) => (
        <option value={option.value} key={index}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
