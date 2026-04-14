import { Link } from "react-router-dom";
import LoderScreen from "../LoderScreen/LoderScreen";
import useCart from "./useCart";

export default function Cart() {
  const {
    HandelDelete,
    HandelChangeCount,
    HandelDeleteAll,
    totalCartPrice,
    products,
  } = useCart();

  if (!products) {
    return <LoderScreen />;
  }
  return (
    <>
      <div className="container mx-auto p-4 mt-10">
        {/* Header */}
        <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-green-600 to-emerald-500 text-center p-3 rounded-lg shadow">
          Shopping Cart
        </h2>

        {/* Top bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 mb-6">
          <h2 className="text-xl font-semibold px-5 py-3 bg-emerald-100 text-emerald-700 rounded-lg shadow-sm border border-emerald-200">
            Total: <span className="font-bold">{totalCartPrice} EGP</span>
          </h2>

          <button
            onClick={HandelDeleteAll}
            className="px-5 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition rounded-lg shadow"
            type="button"
          >
            Remove All Items
          </button>
        </div>

        {/* Table */}
        <div className="relative overflow-x-auto shadow-lg rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs uppercase bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((prodect) => (
                <tr
                  key={prodect._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {/* Image */}
                  <td className="p-4">
                    <img
                      src={prodect.product.imageCover}
                      className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg border"
                      alt={prodect.product.title}
                    />
                  </td>

                  {/* Title */}
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {prodect.product.title}
                  </td>

                  {/* Quantity */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          HandelChangeCount(
                            prodect.product._id,
                            prodect.count - 1,
                          )
                        }
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
                      >
                        -
                      </button>

                      <input
                        type="number"
                        value={prodect.count}
                        className="w-14 text-center border rounded-md py-1"
                        readOnly
                      />

                      <button
                        onClick={() =>
                          HandelChangeCount(
                            prodect.product._id,
                            prodect.count + 1,
                          )
                        }
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-emerald-500 text-white hover:bg-emerald-600"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 font-semibold text-emerald-600">
                    {prodect.price} EGP
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => HandelDelete(prodect.product._id)}
                      className="text-red-500 hover:text-red-700 font-medium transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Checkout */}
          <div className="p-4">
            <Link to="/Order">
              <button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
