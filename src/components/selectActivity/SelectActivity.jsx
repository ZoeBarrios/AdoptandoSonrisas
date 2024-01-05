import { useQuery } from "react-query";
import { getActivities } from "../../services/activity";
import useLanguageStore from "../../stores/useLanguageStore";
import { LANGUAGES } from "../../utils/languajes";
import { ACTIVITY_TRANSLATE } from "../../utils/translate";

export default function SelectActivity({ selectRef, onChange = undefined }) {
  const { data: activities } = useQuery("activities", getActivities);
  const { language } = useLanguageStore();
  let options = {
    className: "p-2 bg-white rounded font-bold",
  };
  if (onChange) {
    options.onChange = onChange;
  } else {
    options.ref = selectRef;
  }

  return (
    <select {...options}>
      {activities?.data &&
        Object.keys(activities.data).map((activity) => {
          if (activities.data[activity]?.activity_name !== "Gestion") {
            return (
              <option
                value={activities.data[activity]?.activity_id}
                key={activities.data[activity]?.activity_id}
              >
                {language == LANGUAGES.ES
                  ? activities.data[activity]?.activity_name
                  : ACTIVITY_TRANSLATE[
                      activities.data[activity]?.activity_name
                    ]}
              </option>
            );
          }
          return null;
        })}
    </select>
  );
}
