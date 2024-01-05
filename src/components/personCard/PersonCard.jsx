import { deletePersonFromOrganization } from "../../services/organization";
import { useMutation } from "react-query";
import useAuthStore from "../../stores/useAuthStore";
import { applyToOrganization } from "../../services/user";
import { showError, showSuccess } from "../../utils/userMessages";
import { Link } from "wouter";
import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";
import { toast } from "react-toastify";

export default function PersonCard({
  person: data,
  refetch,
  organization_id = null,
}) {
  const { person } = data;
  const { language } = useLanguageStore();
  const { organization } = useAuthStore();
  const { mutate } = useMutation(deletePersonFromOrganization, {
    onSuccess: () => {
      showSuccess(TRANSLATES[language].MESSAGES.PERSON.SUCCESS, refetch);
    },
    onError: showError,
  });
  const { mutate: reactivate } = useMutation(applyToOrganization, {
    onSuccess: () => {
      showSuccess(TRANSLATES[language].MESSAGES.PERSON.REACTIVATE, refetch);
    },
    onError: () => {
      toast.error(TRANSLATES[language].MESSAGES.PERSON.ERROR);
    },
  });
  const handleDelete = () => {
    mutate({
      person_id: person.person_id,
      organization_id: organization_id || organization,
    });
  };

  const handleReactivate = () => {
    reactivate({
      person_id: person.person_id,
      organization_id: organization_id || organization,
    });
  };
  return (
    <div className="w-full rounded flex flex-col md:flex-row items-center justify-between bg-ligthOrange p-2">
      <Link
        to={`/usuario/${person.person_id}`}
        className="flex flex-row gap-3 flex-1"
      >
        <p className="text-lg font-bold ">{person.person_id}</p>
        <p className="text-lg cursor-pointer">{person.name.toUpperCase()}</p>
      </Link>
      <p className="text-lg flex-1">{person.email}</p>
      <p className="text-lg flex-1">{person.phone || ""}</p>
      {data.isActive ? (
        <button className="buttons-form flex-1" onClick={handleDelete}>
          {TRANSLATES[language].BUTTONS.DEACTIVATE}
        </button>
      ) : (
        <button className="buttons-form flex-1" onClick={handleReactivate}>
          {TRANSLATES[language].BUTTONS.ACTIVATE}
        </button>
      )}
    </div>
  );
}
