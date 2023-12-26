import { useState } from "react";
import useAuthStore from "../../stores/useAuthStore";
import { ROLES } from "../../utils/constants";
import FormUpdateOrganization from "../forms/update/FormUpdateOrganization";
import FormUpdateUser from "../forms/update/FormUpdateUser";
import { useQuery } from "react-query";
import { getOrganizacionByAdminOrModerator } from "../../services/organization";
import { setToLocalStorage } from "../../utils/localStorageFunctions";
import { useLocation } from "wouter";
import Loader from "../loader/Loader";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

export default function InfoUser() {
  const { user, setOrganization } = useAuthStore();
  const { handleLogout } = useAuth();
  const [showOrgForm, setShowOrgForm] = useState(false);
  const [__, setLocation] = useLocation();
  const { data, refetch, isLoading } = useQuery(
    "organization",
    () => {
      if (user.role !== ROLES.USER && user.role !== ROLES.SUPERADMIN)
        return getOrganizacionByAdminOrModerator(Number(user.id));
      else return null;
    },
    {
      onError: (error) => {
        if (error.status === 401) {
          handleLogout();
          toast.error("Sesión expirada");
        }

        setLocation("/");
      },
      onSuccess: async (data) => {
        setToLocalStorage("organization", data[0]?.organization_id || null);
        setOrganization(data[0]?.organization_id || null);
      },
    }
  );

  const handleClicked = () => {
    setShowOrgForm(!showOrgForm);
  };

  return (
    <section className="flex-container h-screen">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {user.role === ROLES.ADMIN ? (
            <>
              <div className="flex flex-col items-center">
                {showOrgForm ? (
                  <FormUpdateOrganization data={data} refetch={refetch} />
                ) : (
                  <FormUpdateUser user={user} />
                )}
              </div>
              <button
                onClick={handleClicked}
                className="absolute top-0 left-50  md:right-1 button-style mt-2 px-2 md:px-5 py-2 text-base"
              >
                Editar {showOrgForm ? "mi información" : "organización"}
              </button>
            </>
          ) : (
            <FormUpdateUser user={user} />
          )}
        </>
      )}
    </section>
  );
}
