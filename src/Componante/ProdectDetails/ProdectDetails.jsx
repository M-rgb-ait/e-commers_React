import axios from "axios";
import { useParams } from "react-router-dom";
import LoderScreen from "../LoderScreen/LoderScreen";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
// import { WishlistContext } from "../../Context/WishlistContext";

export default function ProdectDetails() {
  // const [curentimg, setcurentimg] = useState(null);
const {id} = useParams();
const {addprodectcart} = useContext(cartContext);
//   const {
//     addwhishlist,
//     removeFromewhishlist,
//     isinwhishlist,
// } =useContext(WishlistContext);


  function Apiprodectid() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }


  const {data, isLoading, isErrer} = useQuery({
    queryKey: ['prodectDetails', id],
    queryFn: Apiprodectid,
  });


  async function handelAddtocart() {
    const res= await addprodectcart(id);
    //display maseges==this
    if (res) {
      // console.log('scsses');
      toast.success('success', {duration: 3000, position: 'top-right'});
    }else{
      // console.log('error');
      toast.error('error', {duration: 3000, position: 'top-right'});
    }
  }

  const ProdectDetailsobj=data?.data.data;
  

  if (isLoading) {
    return <LoderScreen/>
  }
  if (isErrer) {
    return <h1>link go to home</h1>
  }
  return (
    <>
    <div className=" container mx-auto mt-24">
      <div className=" grid sm:grid-cols-4">
        <div className="col-span-1">
          <img src={ProdectDetailsobj.imageCover} className="w-full mb-6" alt={ProdectDetailsobj.title} />
          <div className="flex items-center w-32 gap-4">
            {ProdectDetailsobj?.images.map((item) => <img key={item} src={item} className="grid sm:grid-cols-4"/>
            )}
          </div>
        </div>
        <div className="col-span-3">
          <h1> {ProdectDetailsobj.title} </h1>
          <p> {ProdectDetailsobj.description} </p>
          <h5>price: {ProdectDetailsobj.price} </h5>
          <button onClick={handelAddtocart} className=" bg-green-700 py-2 rounded-lg w-full cursor-pointer">+add cart</button>
        </div>
    {/* <button className=" text-xl" onClick={() => {isfavouret?removeFromewhishlist(ProdectDetailsobj._id) : addwhishlist(ProdectDetailsobj)}}>
      <i className={`fas fa-heart ${isfavouret? 'text-red-500' : 'text-gray-950'}`}></i>
    </button> */}
      </div>
    </div>
    </>
  )
}
