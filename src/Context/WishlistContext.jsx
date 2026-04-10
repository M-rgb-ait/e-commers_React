import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const [whishlist, setWhishlist] = useState([]);

  const headers = {
    token: localStorage.getItem("token"),
  };

  // GET wishlist
  const getwhishlist = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers },
      );

      setWhishlist(data?.data || []);
      toast.success("Added to wishlist ❤️");
    } catch (error) {
      console.log(error);
    }
  };

  // ADD
  const addwhishlist = async (product) => {
    try {
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId: product._id },
        { headers },
      );

      setWhishlist((prev) => [...prev, product]);
    } catch (error) {
      console.log(error);
    }
  };

  // REMOVE
  const removeFromewhishlist = async (productId) => {
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers },
      );

      setWhishlist((prev) => prev.filter((item) => item._id !== productId));
    } catch (error) {
      console.log(error);
    }
  };

  const isinwhishlist = (productId) => {
    return whishlist.some((item) => item._id === productId);
  };

  useEffect(() => {
    getwhishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        whishlist,
        addwhishlist,
        removeFromewhishlist,
        isinwhishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
// function addWishlist(id) {
//     axios.post(`$`,
//         {
//             productId: id,
//         },
//     {
//         headers:{useToken}
//     })
//     .then(function (res){
//         console.log('respons', res.data);

// })
// .catch(function (err){
//     console.log('err',err);
// })
// }
