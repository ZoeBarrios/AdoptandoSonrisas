import { useMutation } from "react-query";
import { Link } from "wouter";
import { deleteCase } from "../../services/cases";
import { toast } from "react-toastify";
import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";

export default function CaseMiniCard({ caseInfo, refetch }) {
  const { language } = useLanguageStore();
  const { animal } = caseInfo;
  const { mutate } = useMutation(deleteCase, {
    onSuccess: () => {
      refetch();
      toast.success("Caso eliminado");
    },
    onError: () => {
      toast.error("Error al eliminar el caso");
    },
  });

  const handleDelete = () => {
    mutate(caseInfo.case_id);
    refetch();
  };

  return (
    <div className="flex flex-col gap-5 md:gap-2 md:flex-row items-center justify-between p-2 w-full bg-ligthOrange rounded ">
      {caseInfo.isDeleted ? (
        <p className="font-bold p-2 text-xl text-red-500 flex-1">
          {caseInfo.title}
        </p>
      ) : (
        <Link
          to={`/casos/${caseInfo.case_id}`}
          className="font-bold p-2 text-xl flex-1"
        >
          {caseInfo?.title}
        </Link>
      )}

      <p className="flex-1">
        {TRANSLATES[language].LABELS.NAME}: {animal?.name}
      </p>
      {caseInfo.isDeleted ? (
        <p className="font-bold p-2">{TRANSLATES[language].BUTTONS.DELETED}</p>
      ) : (
        <button
          onClick={handleDelete}
          className="text-white font-bold p-2 rounded delete-button"
        >
          {TRANSLATES[language].BUTTONS.DELETE}
        </button>
      )}
    </div>
  );
}
