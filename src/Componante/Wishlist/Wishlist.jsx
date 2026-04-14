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
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-white bg-gradient-to-r from-pink-500 to-rose-500 py-3 rounded-lg shadow-md">
          My Favorites
        </h2>

        {/* Empty state */}
        {whishlist.length === 0 && (
          <div className="text-center mt-10">
            <p className="text-gray-500 text-xl">No favorites yet 💔</p>
          </div>
        )}

        {/* Table */}
        {whishlist.length > 0 && (
          <div className="mt-8 overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-100">
            <table className="w-full text-sm text-left text-gray-600">
              <tbody>
                {whishlist.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    {/* Product */}
                    <td className="p-4 flex items-center gap-4">
                      <img
                        src={item.imageCover}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg border"
                      />

                      <div>
                        <h1 className="text-lg font-semibold text-gray-800">
                          {item.title}
                        </h1>

                        <p className="text-emerald-600 font-bold mt-1">
                          {item.price} EGP
                        </p>

                        <button
                          onClick={() => removeFromewhishlist(item._id)}
                          className="mt-2 text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
                        >
                          🗑 Remove
                        </button>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => {
                          HandelAppProdect(item._id);
                          removeFromewhishlist(item._id);
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow transition"
                      >
                        Add to Cart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
