import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";

export default function Select({ id, data, onChange }) {
  const { language } = useLanguageStore();
  return (
    <select defaultValue={id ? id : 0} onChange={onChange}>
      <option value="0" disabled>
        {TRANSLATES[language].DONATE.SELECT}
      </option>
      {data?.map((org) => (
        <option key={org.organization_id} value={org.organization_id}>
          {org.name}
        </option>
      ))}
    </select>
  );
}
