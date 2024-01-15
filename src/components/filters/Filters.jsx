import {
  AGE,
  GENDERS,
  SEARCH_ACTIONS,
  SIZES,
  TYPES,
} from "../../utils/constants";
import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";
import DropDown from "../dropdown/DropDown";

export default function Filters({ state, dispatch }) {
  const { language } = useLanguageStore();
  const translate = TRANSLATES[language].FILTERS;

  const handleChange = (e, actionType) => {
    dispatch({
      type: actionType,
      payload: e.target.value,
    });
  };

  const cleanFilters = () => {
    dispatch({
      type: SEARCH_ACTIONS.RESTART,
    });
  };

  return (
    <div className="flex flex-col items-center gap-5 justify-center md:justify-between w-10/12 mb-5 md:flex-row">
      <div className="flex md:w-2/5 items-center justify-between gap-5">
        <DropDown
          name="genre"
          onChange={(e) => handleChange(e, SEARCH_ACTIONS.SET_GENRE)}
          value={state.genre}
          defaultValue={translate.SEX}
          options={[
            {
              value: GENDERS.F,
              label: TRANSLATES[language].SEX.FEMALE,
            },
            {
              value: GENDERS.M,
              label: TRANSLATES[language].SEX.MALE,
            },
          ]}
        />

        <DropDown
          name="size"
          onChange={(e) => handleChange(e, SEARCH_ACTIONS.SET_SIZE)}
          value={state.size}
          defaultValue={translate.SIZE}
          options={[
            {
              value: SIZES.SMALL,
              label: TRANSLATES[language].SIZE.SMALL,
            },
            {
              value: SIZES.MEDIUM,
              label: TRANSLATES[language].SIZE.MEDIUM,
            },
            {
              value: SIZES.BIG,
              label: TRANSLATES[language].SIZE.BIG,
            },
          ]}
        />

        <DropDown
          name="age"
          onChange={(e) => handleChange(e, SEARCH_ACTIONS.SET_AGE)}
          value={state.age}
          defaultValue={translate.AGE}
          options={[
            {
              value: AGE.PUPPY,
              label: TRANSLATES[language].AGE.PUPPY,
            },
            {
              value: AGE.ADULT,
              label: TRANSLATES[language].AGE.ADULT,
            },
            {
              value: AGE.OLD,
              label: TRANSLATES[language].AGE.OLD,
            },
          ]}
        />

        <DropDown
          name="type"
          onChange={(e) => handleChange(e, SEARCH_ACTIONS.SET_TYPE)}
          value={state.type}
          defaultValue={translate.TYPE}
          options={[
            {
              value: TYPES.DOG,
              label: TRANSLATES[language].TYPES.DOG,
            },
            {
              value: TYPES.CAT,
              label: TRANSLATES[language].TYPES.CAT,
            },
          ]}
        />
      </div>
      <div className="flex items-end gap-5 w-full md:w-auto">
        <button onClick={cleanFilters} className="buttons-form">
          {translate.CLEAN}
        </button>
      </div>
    </div>
  );
}
