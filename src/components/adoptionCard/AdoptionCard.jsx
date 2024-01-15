import { useMutation } from "react-query";
import { cancelAdoption, acceptAdoption } from "../../services/adoptions";
import { ROLES } from "../../utils/constants";
import useAuthStore from "../../stores/useAuthStore";
import { Link } from "wouter";
import { showError, showSuccess } from "../../utils/userMessages";
import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";

export default function AdoptionCard({ adoption, refetch }) {
  const { user } = useAuthStore();
  const { animal } = adoption;
  const { language } = useLanguageStore();

  const { mutate } = useMutation(cancelAdoption, {
    onSuccess: () => {
      showSuccess("Adopción cancelada", refetch);
    },
  });
  const { mutate: acceptAdop } = useMutation(acceptAdoption, {
    onSuccess: () => {
      showSuccess("Adopción aceptada", refetch);
    },
    onError: showError,
  });

  const handleCancel = () => {
    mutate({
      animal_id: animal.animal_id,
      person_id: adoption.person_id,
    });
  };

  const handleAccept = () => {
    acceptAdop({
      animal_id: animal.animal_id,
      person_id: adoption.person_id,
    });
  };

  return (
    <div className="bg-ligthOrange p-5 w-full rounded flex items-center flex-col md:flex-row justify-between gap-3 text-center ">
      <div className="flex flex-row items-center gap-3 flex-1">
        <div className="w-24 h-24 overflow-hidden rounded ">
          <img
            src={animal.img_url}
            alt={animal.name}
            className="object-cover w-full h-ful flex-1l"
          />
        </div>
        <p className="text-xl font-bold flex-1">{animal.name}</p>
      </div>

      <p>
        <span className="font-bold flex-1">
          {TRANSLATES[language].LABELS.DATE_APPLY}:{" "}
        </span>
        {new Date(adoption.adoption_date).toLocaleDateString()}
      </p>
      {user.role != ROLES.USER && (
        <Link
          to={`/usuario/${adoption.person_id}`}
          className="text-base flex-1"
        >
          {TRANSLATES[language].LABELS.ADOPTER}
        </Link>
      )}

      {user.role == ROLES.USER ? (
        <>
          <p className="w-24 font-bold flex-1">
            {adoption.isAccepted
              ? TRANSLATES[language].BUTTONS.ACCEPTED
              : adoption.isCancelled
              ? TRANSLATES[language].BUTTONS.CANCELLED
              : TRANSLATES[language].BUTTONS.PENDING}
          </p>
          {!adoption.isAccepted && !adoption.isCancelled && (
            <button className="delete-button flex-1" onClick={handleCancel}>
              {TRANSLATES[language].BUTTONS.CANCEL_PETITION}
            </button>
          )}
        </>
      ) : (
        <>
          {adoption.isCancelled ? (
            <p className="w-1/3 text-center text-red-500 font-bold flex-1">
              {TRANSLATES[language].BUTTONS.CANCELLED}
            </p>
          ) : (
            <>
              <button
                onClick={adoption.isAccepted ? handleCancel : handleAccept}
                className="buttons-form flex-1"
              >
                {adoption.isAccepted
                  ? TRANSLATES[language].BUTTONS.CANCEL_ADOPTION
                  : TRANSLATES[language].BUTTONS.ACEPT_ADOPTION}
              </button>
              {!adoption.isAccepted && (
                <button onClick={handleCancel} className="buttons-form flex-1">
                  {TRANSLATES[language].BUTTONS.CANCEL_PETITION}
                </button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
