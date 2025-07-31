import { createContext, useEffect } from "react";
// import { authcontext } from "./AuthContext";
import axios from "axios";
import { useState } from "react";

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const [whishlist, setWhishlist] = useState([]);
  // const {useToken} = useContext(authcontext);
  let headers = {
    token: localStorage.getItem("token"),
  };

  const getwhishlist = async () => {
    try {
      const { data } = axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { headers: headers }
      );
      setWhishlist(data?.data || []);
      localStorage.setItem("whishlist", JSON.stringify(data?.data || []));
    } catch (error) {
      console.log(error);
    }
  };

  const addwhishlist = async (prodect) => {
    try {
      await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: prodect._id },
        { headers: headers }
      );
      let updataedlist = [...whishlist, prodect];
      setWhishlist(updataedlist);
      localStorage.setItem("whishlist", JSON.stringify(updataedlist));
    } catch (erro) {
      console.log(erro);
    }
  };
  const removeFromewhishlist = async (productId) => {
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers: headers }
      );
      let filterprodect = whishlist.filter((item) => item.id !== productId);
      setWhishlist(filterprodect);
      localStorage.setItem("whishlist", JSON.stringify(filterprodect));
    } catch (err) {
      console.log(err);
    }
  };
  const isinwhishlist = (productId) => {
    return whishlist.some((item) => item.id == productId);
  };

  useEffect(() => {
    const storedfav = localStorage.getItem("whishlist");
    if (storedfav) {
      setWhishlist(JSON.parse(storedfav));
    } else {
      getwhishlist();
    }
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
