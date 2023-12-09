import { GENDERS } from "../../utils/constants";

export default function SexItem({ sex }) {
  return (
    <i
      className={
        sex && sex === GENDERS.H
          ? "fa-solid fa-venus fa-lg"
          : "fa-solid fa-mars fa-lg"
      }
    ></i>
  );
}
