export default function Select({ id, data, onChange }) {
  return (
    <select defaultValue={id ? id : 0} onChange={onChange}>
      <option value="0" disabled>
        Selecciona una organización
      </option>
      {data?.map((org) => (
        <option key={org.organization_id} value={org.organization_id}>
          {org.name}
        </option>
      ))}
    </select>
  );
}
