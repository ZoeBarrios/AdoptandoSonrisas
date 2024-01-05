import { AGE, GENDERS, SEARCH_ACTIONS, SIZES } from "../../utils/constants";
import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";

export default function Filters({ state, dispatch }) {
  const { language } = useLanguageStore();
  const translate = TRANSLATES[language].FILTERS;
  const handleChangeGender = (e) => {
    dispatch({
      type: SEARCH_ACTIONS.SET_GENRE,
      payload: e.target.value,
    });
  };

  const handleChangeSize = (e) => {
    dispatch({
      type: SEARCH_ACTIONS.SET_SIZE,
      payload: e.target.value,
    });
  };

  const handleChangeAge = (e) => {
    dispatch({
      type: SEARCH_ACTIONS.SET_AGE,
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
        <select name="genre" onChange={handleChangeGender} value={state.genre}>
          <option value="" disabled defaultValue={state.genre}>
            {translate.SEX}
          </option>
          <option value={GENDERS.F}>{TRANSLATES[language].SEX.FEMALE}</option>
          <option value={GENDERS.M}>{TRANSLATES[language].SEX.MALE}</option>
        </select>
        <select name="size" onChange={handleChangeSize} value={state.size}>
          <option value="" disabled defaultValue={state.size}>
            {translate.SIZE}
          </option>
          <option value={SIZES.SMALL}>
            {" "}
            {TRANSLATES[language].SIZE.SMALL}
          </option>
          <option value={SIZES.MEDIUM}>
            {TRANSLATES[language].SIZE.MEDIUM}
          </option>
          <option value={SIZES.BIG}>{TRANSLATES[language].SIZE.BIG}</option>
        </select>
        <select name="age" onChange={handleChangeAge} value={state.age}>
          <option value="" disabled defaultValue={state.age}>
            {translate.AGE}
          </option>
          <option value={AGE.PUPPY}>{TRANSLATES[language].AGE.PUPPY}</option>
          <option value={AGE.ADULT}>{TRANSLATES[language].AGE.ADULT}</option>
          <option value={AGE.OLD}>{TRANSLATES[language].AGE.OLD}</option>
        </select>
      </div>
      <div className="flex items-end gap-5 w-full md:w-auto">
        <button onClick={cleanFilters} className="buttons-form">
          {translate.CLEAN}
        </button>
      </div>
    </div>
  );
}
