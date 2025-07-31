import axios from "axios";
import { Link } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import LoderScreen from "../LoderScreen/LoderScreen";

export default function Brands() {
  //   const [isprands, setprands] = useState(null)

  // function Apicategro() {
  //   axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  //   .then(function (respons) {
  //     console.log(respons.data.data);
  //     setprands(respons.data.data);
  //   })
  //   .catch(function (error) {
  //     console.log(error);

  //   });
  // }

  // useEffect(()=> {
  //   Apicategro();
  // },[])

  function ApibrandsAll() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { data, isErrer, isLoading } = useQuery({
    queryKey: "ApibrandsAll",
    queryFn: ApibrandsAll,
    placeholderData: keepPreviousData,
  });

  const allprodects = data?.data.data;

  if (isLoading) {
    return <LoderScreen />;
  }
  if (isErrer) {
    return <h1>link go to home</h1>;
  }

  return (
    <>
      <div className=" container mx-auto mt-7">
        <div className=" grid sm:grid-cols-3 gap-5">
          {allprodects?.map((brand) => (
            <Link to={`/BrandsDelelis/${brand._id}`} key={brand._id}>
              <img src={brand.image} className="w-full" alt={brand.name} />
            </Link>
          ))}
          {/* <button onClick={handelAddtocart} className=" bg-green-700 py-2 rounded-lg w-full">+add cart</button> */}
        </div>
      </div>
    </>
  );
}
