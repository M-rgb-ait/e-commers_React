import toast from "react-hot-toast";
import { cartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";
import { useContext } from "react";

export default function Wishlist() {
  const { addprodectcart } = useContext(cartContext);

  async function HandelAppProdect(id) {
    const res = await addprodectcart(id);

    if (res) {
      toast.success("prodect successfly add", {
        duration: 3000,
        position: "top-right",
      });
    } else {
      toast.error("error", { duration: 3000, position: "top-right" });
    }
  }

  const { whishlist, removeFromewhishlist } = useContext(WishlistContext);

  return (
    <>
      <div className="container mx-auto p-4 mt-10">
        <h2 className="text-green-500 font-bold text-center text-4xl mt-7 mb-7">
          favourites
        </h2>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <tbody>
              {whishlist.length === 0 && (
                <p className="text-blue-600 text-5xl p-4">no favourites.....</p>
              )}

              {whishlist.map((item) => (
                <tr
                  key={item._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 dark:hover:bg-gray-600"
                >
                  <td className="p-4 flex items-center">
                    <img
                      src={item.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full bg-white"
                      alt={item.title}
                    />
                    <div className="flex items-center flex-col">
                      <h1 className="mt-2 mb-2 text-2xl text-black">
                        {item.title}
                      </h1>
                      <h1 className="mt-2 mb-2 text-2xl text-green-600">
                        {item.price}EGP
                      </h1>
                      <a
                        onClick={() => removeFromewhishlist(item._id)}
                        className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline"
                      >
                        <i className="fa-solid fa-trash text-red-500"></i>Remove
                      </a>
                    </div>
                  </td>

                  <td>
                    <button
                      onClick={() => {
                        HandelAppProdect(item._id),
                          removeFromewhishlist(item._id);
                      }}
                      className=" bg-green-700 text-black rounded-lg p-2"
                    >
                      Addproduct
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
