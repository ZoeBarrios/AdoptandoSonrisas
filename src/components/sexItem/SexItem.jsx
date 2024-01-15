import { GENDERS } from "../../utils/constants";

export default function SexItem({ sex }) {
  return (
    <i
      className={
        sex == GENDERS.F ? "fa-solid fa-venus fa-lg" : "fa-solid fa-mars fa-lg"
      }
    ></i>
  );
}
