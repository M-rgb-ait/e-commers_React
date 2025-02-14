
import { Link } from "react-router-dom";
import LoderScreen from "../LoderScreen/LoderScreen";
import useCart from "./useCart";

export default function Cart() {

    const {HandelDelete,HandelChangeCount,HandelDeleteAll,totalCartPrice,products} = useCart();



if (!products) {
    return <LoderScreen/>
}



  return (
    <>



<div className="container mx-auto p-4 mt-10">
    <h2 className="text-4xl text-gray-900 bg-green-500 text-center p-2">cart</h2>
    <div className="flex justify-between items-center mt-7 mb-7">
    <h2 className="text-2xl p-3 bg-green-500 border border-green-500 rounded-md">totalCart: {totalCartPrice}</h2>
    <button onClick={HandelDeleteAll} className="flex items-center justify-center p-1 ms-3 text-sm text-red-600 bg-red-300 border border-red-500 rounded-md dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
        Remove All product
    </button>
    </div>

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>


    <tbody>
      
{products.map(prodect => <tr key={prodect._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={prodect.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={prodect.product.title} />
        </td>

        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {prodect.product.title}
        </td>

        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={() => HandelChangeCount(prodect.product._id, prodect.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
            -
            </button>


            <div>
              <input type="number" value={prodect.count} id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>


            <button onClick={() => HandelChangeCount(prodect.product._id, prodect.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
            +
            </button>
          </div>
        </td>



        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {prodect.price}EGP
        </td>
        <td className="px-6 py-4">
          <a onClick={() =>HandelDelete(prodect.product._id)} className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline">Remove</a>
        </td>
      </tr>

)}

    </tbody>
  </table>
  <Link to='/Order'>
  <button className="bg-green-500 p-5 w-full">pay prodect</button>
  </Link>
</div>

</div>



    </>
  )
}
