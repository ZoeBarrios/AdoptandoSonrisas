import { ROLES } from "../../../utils/constants";
import useAuthStore from "../../../stores/useAuthStore";
import { Link } from "wouter";
import useLanguageStore from "../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../utils/languajes";
import { useAcceptAdoption } from "../../../hooks/mutations/adoption/useAcceptAdoption";
import { useCancelAdoption } from "../../../hooks/mutations/adoption/useCancelAdoption";

export default function AdoptionCard({ adoption, refetch }) {
  const { user } = useAuthStore();
  const { animal } = adoption;
  const { language } = useLanguageStore();
  const { handleAccept } = useAcceptAdoption(refetch, animal, adoption);
  const { handleCancel } = useCancelAdoption(refetch, animal, adoption);

  return (
    <div className="bg-ligthOrange p-5 w-full rounded flex items-center flex-col md:flex-row justify-between gap-3 text-center">
      <div className="flex flex-row items-center gap-3 flex-1">
        <div className="w-24 h-24 overflow-hidden rounded ">
          <img
            src={animal.img_url}
            alt={animal.name}
            className="object-cover w-full h-ful flex-1l"
          />
        </div>
        <p className="text-xl font-bold">{animal.name}</p>
      </div>

      <p className="flex-1">
        <span className="font-bold flex-1 text-base">
          {TRANSLATES[language].LABELS.DATE_APPLY}:{" "}
        </span>
        {new Date(adoption.adoption_date).toLocaleDateString()}
      </p>
      {user.role != ROLES.USER && (
        <Link
          to={`/usuario/${adoption.person_id}`}
          className="text-xl flex-1 hover:text-white"
        >
          {TRANSLATES[language].LABELS.ADOPTER}
        </Link>
      )}

      {user.role == ROLES.USER ? (
        <>
          <p className="w-24 font-bold flex-1 text-xl">
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
