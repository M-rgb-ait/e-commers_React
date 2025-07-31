import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoderScreen from "../LoderScreen/LoderScreen";

export default function CategoresDitilels() {
  const { id } = useParams();
  console.log("id", id);

  function ApiCategoresDitilels() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );
  }

  const { data, isLoading, isErrer } = useQuery({
    queryKey: ["ApiCategoresDitilels", id],
    queryFn: ApiCategoresDitilels,
  });

  const ProdectCategoresDitilels = data?.data.data;

  if (isLoading) {
    return <LoderScreen />;
  }
  if (isErrer) {
    return <h1>link go to home</h1>;
  }
  return (
    <>
      <div className=" container mx-auto mt-14">
        {ProdectCategoresDitilels?.map((categorys) => (
          <div
            key={categorys._id}
            className=" grid sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6"
          >
            <h1 className="mt-5 mb-5 font-bold py-3 border border-green-500 rounded-md text-center">
              name: {categorys.name}{" "}
            </h1>
          </div>
        ))}
      </div>
    </>
  );
}
