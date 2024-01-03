import { Link, useParams } from "wouter";
import { getOrganization } from "../../services/organization";
import "../../components/caseCard/CaseCard.css";
import { useQuery } from "react-query";
import DefaultPage from "../defaultPage/DefaultPage";
import useAuthStore from "../../stores/useAuthStore";
import { ROLES } from "../../utils/constants";
import Loader from "../../components/loader/Loader";
export default function Organization() {
  const { id } = useParams();
  const { user } = useAuthStore();

  const { data, isLoading, isError } = useQuery(["organization", id], () =>
    getOrganization(id)
  );

  const handleSocialMedia = (e) => {
    const name = e.target.getAttribute("name");

    switch (name) {
      case "instagram":
        window.open(data.instagram_link, "_blank");
        break;
      case "facebook":
        window.open(data.facebook_link, "_blank");
        break;
      case "email":
        console.log("email");
        break;
      case "phone":
        window.location.href = `tel:${data.phone}`;
        break;
      default:
        break;
    }
  };

  return (
    <DefaultPage>
      <section className="relative bg-grey h-screen flex flex-col items-center justify-center">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="h-4/5 max-h-full gap-5 relative w-11/12 md:w-9/12 m-auto p-5 flex flex-col items-center justify-between  bg-white rounded-lg shadow-card">
            <h1 className="title">{data?.name}</h1>
            <p className="text-xl mt-5 rounded-lg w-8/12 h-3/5 overflow-y-auto">
              {data?.description}
            </p>

            <div className=" w-full flex flex-col md:flex-row items-center justify-between mt-10 gap-10">
              <div className="w-full flex items-center justify-evenly">
                {data?.instagram_link && (
                  <i
                    className="fa-brands fa-instagram fa-2xl icon"
                    name="instagram"
                    onClick={handleSocialMedia}
                  ></i>
                )}
                {data?.facebook_link && (
                  <i
                    className="fa-brands fa-facebook fa-2xl icon"
                    name="facebook"
                    onClick={handleSocialMedia}
                  ></i>
                )}
                {data?.email && (
                  <i
                    className="fa-solid fa-envelope fa-2xl icon"
                    name="email"
                    onClick={handleSocialMedia}
                  ></i>
                )}
                {data?.phone && (
                  <i
                    className="fa-solid fa-phone fa-2xl icon"
                    name="phone"
                    onClick={handleSocialMedia}
                  ></i>
                )}
              </div>

              <Link
                to={`/donar/${id}`}
                className="buttons-form w-7/12 text-center"
              >
                Donar
              </Link>
              {user?.role == ROLES.SUPERADMIN && data?.isAccepted && (
                <Link
                  to={`/organizacion/admins/${id}`}
                  className="buttons-form text-center w-7/12"
                >
                  Administradores
                </Link>
              )}
            </div>
          </div>
        )}
      </section>
    </DefaultPage>
  );
}
