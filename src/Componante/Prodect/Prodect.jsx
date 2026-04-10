import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import axios from "axios";
// import { keepPreviousData, useQuery } from "@tanstack/react-query";
import LoderScreen from "../LoderScreen/LoderScreen";
import { Link } from "react-router-dom";
// import ReactPaginate from "react-paginate";
import { WishlistContext } from "../../Context/WishlistContext";
// import ReactPaginate from "react-paginate";

export default function Home() {
  const [sort, setSort] = useState("title");
  const [currpage, setcurrpage] = useState(1);
  const [allprodect, setallprodect] = useState({});
  const [isLoading, setLodersceen] = useState(false);

  // const handelpage = ({selected}) => {
  //   setpage(selected + 1)
  // }

  const { addprodectcart } = useContext(cartContext);
  const { whishlist, addwhishlist, removeFromewhishlist, isinwhishlist } =
    useContext(WishlistContext);
  console.log("whishlist", whishlist);

  const handelSort = async (e) => {
    setSort(e.target.value);
  };

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

  //   // if (localStorage.getItem('token') == null) {
  //   //   return <h3>no home</h3>
  //   // }

  //  const [allprodect, setallprodect] = useState(null);
  //  const [allodersceen, setLodersceen] = useState(false);

  async function Apiprodect() {
    setLodersceen(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products",
      {
        params: {
          limit: 30,
          page: currpage,
          sort,
        },
      },
    );
    setallprodect(data);
    setLodersceen(false);
  }

  useEffect(() => {
    Apiprodect();
  }, [currpage, sort]);

  // function Apiprodect2() {
  //   return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  // }

  // const {data, isErrer,  isLoading} = useQuery({
  //   queryKey: 'prodects',
  //   queryFn: Apiprodect2,
  //   // refetchOnWindowFocus:falos, no refreh when move on the tab

  //   // refetchInterval:3000, isLoading all how thim

  //   // retry: 1, any error in network
  //   // retryDelay: 1000,

  //   // staleTime: 5000, recwest when leved page no on the page

  //   // gcTime: 5000, when remove this page counter 5 scent new page and then back old this page will 1- refreh 2- recwestdata

  //   // placeholderData:keepPreviousData ,     // fetch all pages in api
  //   placeholderData: keepPreviousData ,

  //   // refetchOnMount: true,

  //   // refetchIntervalInBackground:500,

  // });
  // console.log(data);
  // console.log(isErrer);
  // console.log(error);
  // console.log(isLoading);
  // console.log(isFetching);

  // const allprodects = data?.data.data;

  if (isLoading) {
    return <LoderScreen />;
  }
  // if (isErrer) {
  //   return <h1>link go to home</h1>
  // }

  return (
    <>
      <div className="container mx-auto mt-24 px-4">
        {/* Filter */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <label htmlFor="productSelect">
            <i className="fa-solid fa-filter text-green-600 text-2xl"></i>
          </label>

          <select
            id="productSelect"
            onChange={handelSort}
            defaultValue={sort}
            className="w-52 py-3 border border-green-500 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="-price">Price High to Low</option>
            <option value="price">Price Low to High</option>
            <option value="ratingsAverage">Top Rated</option>
            <option value="title">A to Z</option>
            <option value="-title">Z to A</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-5">
          {allprodect.data?.map((prodect) => {
            const isfavouret = isinwhishlist(prodect.id);

            return (
              <div
                key={prodect._id}
                className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <Link
                  to={`/ProdectDetails/${prodect._id}`}
                  className="block p-3"
                >
                  {/* Image */}
                  <div className="overflow-hidden rounded-xl">
                    <img
                      src={prodect.imageCover}
                      alt={prodect.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mt-3 font-semibold text-gray-800">
                    {prodect.title.split("").slice(0, 11).join("")}
                  </h3>

                  {/* Category */}
                  <h2 className="text-sm text-gray-500">
                    {prodect.category.name}
                  </h2>

                  {/* Rating + Price */}
                  <div className="flex justify-between items-center mt-4">
                    <p className="flex items-center gap-1 text-yellow-500 text-sm">
                      <i className="fa-solid fa-star"></i>
                      {prodect.ratingsAverage}
                    </p>

                    <div className="flex gap-2 text-sm">
                      {prodect.priceAfterDiscount ? (
                        <>
                          <p className="font-semibold">{prodect.price}</p>
                          <p className="text-red-500 line-through">
                            {prodect.priceAfterDiscount}
                          </p>
                        </>
                      ) : (
                        <p className="font-semibold">{prodect.price}</p>
                      )}
                    </div>
                  </div>
                </Link>

                {/* Actions */}
                <div className="flex items-center justify-between px-3 pb-3 mt-2">
                  {/* Add Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      HandelAppProdect(prodect._id);
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded-lg transition"
                  >
                    Add to Cart
                  </button>

                  {/* Wishlist */}
                  <button
                    className="text-xl transition"
                    onClick={() => {
                      isfavouret
                        ? removeFromewhishlist(prodect._id)
                        : addwhishlist(prodect);
                    }}
                  >
                    <i
                      className={`fas fa-heart transition ${
                        isfavouret
                          ? "text-red-500"
                          : "text-gray-400 hover:text-red-400"
                      }`}
                    ></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-center mt-32 mb-6">
        {[1, 2].map((item) => (
          <button
            key={item}
            onClick={() => setcurrpage(item)}
            className={`px-2 py-2 ${
              currpage == item ? "bg-green-400" : null
            }  border border-green-400`}
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
}
