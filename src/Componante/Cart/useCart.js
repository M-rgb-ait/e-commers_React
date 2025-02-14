import { useContext } from "react";
import toast from "react-hot-toast";
import { cartContext } from "../../Context/CartContext";

export default function useCart() {

const {totalCartPrice, products, UpdataCount, RemovElementFromCart,RemoveAllFromCart} = useContext(cartContext);
// console.log('products', products);



async function HandelChangeCount(id, newCount) {
    const res= await UpdataCount(id, newCount);
    res? toast.success("success is updata") : toast.error("error")
}


async function HandelDelete(id) {
    const res= await RemovElementFromCart(id);
    res? toast.success("success is Delete") : toast.error("error")
}
async function HandelDeleteAll() {
    const res= await RemoveAllFromCart();
    res? toast.success("success is Delete all") : toast.error("error")
}






  return {HandelDelete,HandelChangeCount,HandelDeleteAll,totalCartPrice,products}
}
