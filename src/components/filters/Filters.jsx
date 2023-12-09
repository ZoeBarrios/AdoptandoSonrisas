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
    <div className="flex items-center justify-between w-10/12 mb-5 ">
      <div className="flex w-2/5 items-center justify-between gap-5">
        <select
          name="gender"
          onChange={handleChangeGender}
          value={state.gender}
        >
          <option value="" disabled selected className="select">
            Sexo
          </option>
          <option value={GENDERS.H}>Hembra</option>
          <option value={GENDERS.M}>Macho</option>
        </select>
        <select name="size" onChange={handleChangeSize} value={state.size}>
          <option value="" disabled selected>
            Tamaño
          </option>
          <option value={SIZES.PEQUEÑO}>Pequeño</option>
          <option value={SIZES.MEDIANO}>Mediano</option>
          <option value={SIZES.GRANDE}>Grande</option>
        </select>
        <select name="age" onChange={handleChangeAge} value={state.age}>
          <option value="" disabled selected>
            Edad
          </option>
          <option value={AGE.CACHORRO}>Cachorro</option>
          <option value={AGE.ADULTO}>Adulto</option>
          <option value={AGE.ANCIANO}>Anciano</option>
        </select>
      </div>
      <div className="flex items-end gap-5">
        <button
          onClick={cleanFilters}
          className="bg-orange p-3 rounded hover:bg-gray-200 transition-all duration-300"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}
