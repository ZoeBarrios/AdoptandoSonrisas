import Loader from "../loader/Loader";
import Error from "../error/Error";

export default function FetchInfo({ error, loading }) {
  if (error) return <Error />;
  if (loading) return <Loader />;
  return null;
}
