import { AGE, GENDERS, SEARCH_ACTIONS, SIZES } from "../../utils/constants";

export default function Filters({ state, dispatch }) {
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
            Sexo
          </option>
          <option value={GENDERS.F}>Hembra</option>
          <option value={GENDERS.M}>Macho</option>
        </select>
        <select name="size" onChange={handleChangeSize} value={state.size}>
          <option value="" disabled defaultValue={state.size}>
            Tamaño
          </option>
          <option value={SIZES.SMALL}>Pequeño</option>
          <option value={SIZES.MEDIUM}>Mediano</option>
          <option value={SIZES.BIG}>Grande</option>
        </select>
        <select name="age" onChange={handleChangeAge} value={state.age}>
          <option value="" disabled defaultValue={state.age}>
            Edad
          </option>
          <option value={AGE.PUPPY}>Cachorro</option>
          <option value={AGE.ADULT}>Adulto</option>
          <option value={AGE.OLD}>Anciano</option>
        </select>
      </div>
      <div className="flex items-end gap-5 w-full md:w-auto">
        <button
          onClick={cleanFilters}
          className="bg-orange p-3 w-full rounded hover:bg-gray-200 transition-all duration-300"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}
