import axios from "axios";
import { useParams } from "react-router-dom";
import LoderScreen from "../LoderScreen/LoderScreen";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
// import { WishlistContext } from "../../Context/WishlistContext";

export default function ProdectDetails() {
  const [curentimg, setcurentimg] = useState(null);
  const { id } = useParams();
  const { addprodectcart } = useContext(cartContext);
  //   const {
  //     addwhishlist,
  //     removeFromewhishlist,
  //     isinwhishlist,
  // } =useContext(WishlistContext);

  function Apiprodectid() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, isLoading, isErrer } = useQuery({
    queryKey: ["prodectDetails", id],
    queryFn: Apiprodectid,
  });

  async function handelAddtocart() {
    const res = await addprodectcart(id);
    //display maseges==this
    if (res) {
      // console.log('scsses');
      toast.success("success", { duration: 3000, position: "top-right" });
    } else {
      // console.log('error');
      toast.error("error", { duration: 3000, position: "top-right" });
    }
  }

  const ProdectDetailsobj = data?.data.data;
  useEffect(
    function () {
      setcurentimg(ProdectDetailsobj?.imageCover);
    },
    [ProdectDetailsobj],
  );

  if (isLoading) {
    return <LoderScreen />;
  }
  if (isErrer) {
    return <h1>link go to home</h1>;
  }
  return (
    <>
      <div className="container mx-auto mt-24 px-4">
        {/* Main Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Image Section */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-3">
              <img
                src={curentimg}
                className="w-full h-[350px] object-cover rounded-xl"
                alt={ProdectDetailsobj.title}
              />
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-3 space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {ProdectDetailsobj.title}
            </h1>

            <p className="text-gray-600 leading-relaxed">
              {ProdectDetailsobj.description}
            </p>

            <h5 className="text-xl font-semibold text-green-600">
              Price: {ProdectDetailsobj.price} EGP
            </h5>

            <button
              onClick={handelAddtocart}
              className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl w-full transition"
            >
              + Add to Cart
            </button>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex flex-wrap gap-4 mt-10 justify-center">
          {ProdectDetailsobj?.images.map((item, index) => (
            <img
              key={index}
              src={item}
              onClick={() => setcurentimg(item)}
              className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 transition hover:scale-105 ${
                curentimg === item ? "border-green-500" : "border-transparent"
              }`}
              alt="product"
            />
          ))}
        </div>
      </div>
    </>
  );
}
