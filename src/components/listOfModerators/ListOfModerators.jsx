import PersonCard from "../personCard/PersonCard";
import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";

export default function ListOfModerators({ data, refetch }) {
  const { language } = useLanguageStore();
  return (
    <section className="list-card shadow-card">
      {data?.length > 0 ? (
        data.map((moderator) => (
          <PersonCard key={moderator.id} person={moderator} refetch={refetch} />
        ))
      ) : (
        <h2 className="title-no-info">
          {TRANSLATES[language].MODERATORS.NO_MODERATORS}
        </h2>
      )}
    </section>
  );
}
