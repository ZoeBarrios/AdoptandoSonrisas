import { Link, useParams } from "wouter";
import { getOrganization } from "../../services/organization";
import FetchInfo from "../../components/fetchInfo/FetchInfo";
import "../../components/caseCard/CaseCard.css";
import { useQuery } from "react-query";
import DefaultPage from "../defaultPage/DefaultPage";
export default function Organization() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery(["organization", id], () =>
    getOrganization(id)
  );

  const handleSocialMedia = (e) => {
    const name = e.target.getAttribute("name");

    switch (name) {
      case "instagram":
        window.open(data.instagram_url, "_blank");
        break;
      case "facebook":
        window.open(data.facebook_ulr, "_blank");
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

  if (isError || isLoading)
    return <FetchInfo error={isError} loading={isLoading} />;
  return (
    <DefaultPage>
      <div className="relative top-0 p-10 bg-grey">
        <section className="relative mt-40 md:w-9/12 m-auto p-5 flex flex-col items-center justify-center mb-10 bg-white rounded-lg shadow-card">
          <h1 className="text-4xl font-bold mt-5">{data?.name}</h1>
          <p className="text-xl mt-5 rounded-lg w-8/12 ">{data?.description}</p>

          <div className="w-6/12 flex flex-col md:flex-row items-center justify-between mt-10 gap-10">
            <div className="w-6/12 flex items-center justify-evenly">
              {data?.instagram_url && (
                <i
                  className="fa-brands fa-instagram fa-2xl icon"
                  name="instagram"
                  onClick={handleSocialMedia}
                ></i>
              )}
              {data?.facebook_ulr && (
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
              className="bg-orange px-7 py-1 rounded text-white bold hover:bg-green"
            >
              Donar
            </Link>
          </div>
        </section>
      </div>
    </DefaultPage>
  );
}
