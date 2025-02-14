import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoderScreen from "../../LoderScreen/LoderScreen";

export default function BrandsDelelis() {
const {id} = useParams();

  function ApiBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
  }


  const {data, isLoading, isErrer} = useQuery({
    queryKey: ['ApiBrands', id],
    queryFn: ApiBrands,
  });



  const ProdectBrandsobj=data?.data.data;
  

  if (isLoading) {
    return <LoderScreen/>
  }
  if (isErrer) {
    return <h1>link go to home</h1>
  }
  return (
    <>
    <div className=" container mx-auto">
    <div className=" grid sm:grid-cols-4">
        <div className="col-span-1">
        <img src={ProdectBrandsobj.image} className="w-full" alt={ProdectBrandsobj.name} />
        <h1 className="font-bold p-4">name: {ProdectBrandsobj.name} </h1>
        </div>
    </div>
    </div>
    </>
)
}
