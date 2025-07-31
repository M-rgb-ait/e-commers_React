import { createContext, useContext, useEffect } from "react";
import { authcontext } from "./AuthContext";
import axios from "axios";
import { useState } from "react";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const { useToken } = useContext(authcontext);
  //HINT: to be sald=> multiple states (scersh)
  // const [numOfCartItems, setnumOfCartItems] = useState(0);
  const [totalCartPrice, settotalCartPrice] = useState(0);
  const [products, setproducts] = useState(null);
  const [cartId, setCartid] = useState(null);

  // console.log('cartId', cartId);

  //Dervied states الاشتقاق
  const numOfCartItems = products?.length;
  // const headers ={
  //     useToken
  // }

  function restevalus() {
    settotalCartPrice(0);
    setproducts(null);
    setCartid(null);
  }

  async function addprodectcart(id) {
    const res = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        {
          headers: { token: useToken },
        }
      )
      .then(function (res) {
        //display maseges==this               this is asncrons
        // setnumOfCartItems(res.data.numOfCartItems);
        // settotalCartPrice(res.data.totalCartPrice);
        // setproducts(res.data.products);
        setCartid(res.data.cartId);
        getUserCart();
        return true;
      })
      .catch(function (err) {
        console.log("err", err);
        return false;
      });
    return res;
  }

  function getUserCart() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: useToken,
        },
      })
      .then(function (resp) {
        // console.log('resp',resp.data.numOfCartItems);
        // console.log('resp',resp.data.data.totalCartPrice);
        // console.log('resp',resp.data.data.products);
        // setnumOfCartItems(resp.data.numOfCartItems);
        settotalCartPrice(resp.data.data.totalCartPrice);
        setproducts(resp.data.data.products);
        setCartid(resp.data.cartId);
      })
      .catch(function (err) {
        console.log("err", err);
      });
  }

  async function UpdataCount(id, newCount) {
    const res = await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: newCount,
        },
        {
          headers: {
            token: useToken,
          },
        }
      )
      .then(function (resp) {
        // setnumOfCartItems(resp.data.numOfCartItems);
        settotalCartPrice(resp.data.data.totalCartPrice);
        setproducts(resp.data.data.products);
        return true;
      })
      .catch(function (err) {
        console.log("err", err);
        return false;
      });
    return res;
  }
  async function RemovElementFromCart(id) {
    const res = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: {
          token: useToken,
        },
      })
      .then(function (resp) {
        // setnumOfCartItems(resp.data.numOfCartItems);
        settotalCartPrice(resp.data.data.totalCartPrice);
        setproducts(resp.data.data.products);
        return true;
      })
      .catch(function (err) {
        console.log("err", err);
        return false;
      });
    return res;
  }
  async function RemoveAllFromCart() {
    const res = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token: useToken,
        },
      })
      .then(function () {
        settotalCartPrice(0);
        setproducts(null);
        return true;
      })
      .catch(function (err) {
        console.log("err", err);
        return false;
      });
    return res;
  }

  //componant did mount
  useEffect(() => {
    //on evrey refresh and for the first time
    if (useToken) {
      getUserCart();
    }
    // Login =>
  }, [useToken]);

  return (
    <>
      <cartContext.Provider
        value={{
          addprodectcart,
          getUserCart,
          numOfCartItems,
          totalCartPrice,
          products,
          UpdataCount,
          RemovElementFromCart,
          RemoveAllFromCart,
          cartId,
          restevalus,
        }}
      >
        {children}
      </cartContext.Provider>
    </>
  );
}
