
import LoderScreen from "../LoderScreen/LoderScreen";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Categores() {

  function ApiCategores() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }
  const {data, isLoading} = useQuery({
    queryKey: ['ApiCategores'],
    queryFn: ApiCategores,
  });
  const allCategores = data?.data.data;

  if (isLoading) {
    return <LoderScreen/>
  }


  return (
    <>


    <div className=" container mx-auto p-5 mt-14">
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-10 mb-9 mt-10">
        {allCategores.map(category => <Link  to={`/CategoresDitilels/${category._id}`} key={category._id}>
          <img src={category.image} className=" w-full h-full" alt={category.name} />
          <h2>{category.name}</h2>
        </Link>)}
      </div>
    </div>
    </>
  )
}