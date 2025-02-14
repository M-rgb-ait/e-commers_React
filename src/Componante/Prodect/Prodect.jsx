import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import axios from "axios";
// import { keepPreviousData, useQuery } from "@tanstack/react-query";
import LoderScreen from "../LoderScreen/LoderScreen";
import { Link } from "react-router-dom";
// import ReactPaginate from "react-paginate";
import { WishlistContext } from "../../Context/WishlistContext";


export default function Home() {
  const [sort, setSort] = useState('title');
  //  const [page, setpage] = useState(1);
   const [allprodect, setallprodect] = useState({});
 const [isLoading, setLodersceen] = useState(false);

  // const handelpage = ({selected}) => {
  //   setpage(selected + 1)
  // }

  const {addprodectcart} =useContext(cartContext);
  const {
    whishlist,
    addwhishlist,
    removeFromewhishlist,
    isinwhishlist,
} =useContext(WishlistContext);
console.log('whishlist',whishlist);


  const handelSort = async (e) => {

    setSort(e.target.value);
  }

  async function HandelAppProdect (id) {
    const res = await addprodectcart(id);

      if (res) {
        toast.success('prodect successfly add', {duration: 3000, position: 'top-right'});
      }else{
        toast.error('error', {duration: 3000, position: 'top-right'});
      }

  }

//   // if (localStorage.getItem('token') == null) {
//   //   return <h3>no home</h3>
//   // }

//  const [allprodect, setallprodect] = useState(null);
//  const [allodersceen, setLodersceen] = useState(false);

 async function Apiprodect() {
  setLodersceen(true);
    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products',{
    params:{
      // limit:20,
      // page:page,
      sort,
    }})
    setallprodect(data);
    setLodersceen(false);
  }

useEffect(()=>{
  Apiprodect();
},[sort])

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
    return <LoderScreen/>
  }
  // if (isErrer) {
  //   return <h1>link go to home</h1>
  // }
  

  return (

    <>

    <div className=" container mx-auto mt-24">
    <div className="flex items-center justify-center gap-5 mb-5">

    <label htmlFor="productSelect">
    <i className="fa-solid fa-filter text-green-600 text-2xl"></i>
    </label>
    <select id="productSelect" onChange={handelSort} defaultValue={sort} className="w-1/5 py-3 border border-green-500 rounded-md text-center">
    <option value="-price">price High to Low</option>
    <option value="price">price Low to High</option>
    <option value="ratingsAverage">Top Reted</option>
    <option value="title">A to Z</option>
    <option value="-title">Z to A</option>
    </select>
    </div>

      <div className=" grid md:grid-cols-3 lg:md:grid-cols-6 gap-2 md:gap-5">

    {/* {allodersceen && <LoderScreen/>} */}
        {allprodect.data?.map((prodect) => {

          const isfavouret = isinwhishlist(prodect.id);

          return(
          <div key={prodect._id} className="relative">
          <Link to={`/ProdectDetails/${prodect._id}`} className="rounded-lg p-1 relative overflow-hidden group">
          <img src={prodect.imageCover} alt={prodect.title} className="w-full" />
          <h3>{prodect.title.split('').slice(0, 11).join('')}</h3>
          <h2 className="mt-5">{prodect.category.name}</h2>
          <div className=" flex justify-between items-center mt-5 mb-5">
            <p><i className="fa-solid fa-star text-yellow-400"></i> {prodect.ratingsAverage}</p>
            <div className=" flex gap-2 ">
              {prodect.priceAfterDiscount ? <>
                <p>{prodect.price}</p>
                <p className="text-red-500 line-through">{prodect.priceAfterDiscount}</p>
              </>
                :<p>{prodect.price}</p> }
            </div>
          </div>
          {/* gap-6 translate-x-[100%] group-hover:translate-x-0  */}
          
          <div className=" absolute left-[90px] transition">
          <button onClick={(e) =>
            {e.preventDefault();
              HandelAppProdect(prodect._id)}} 
              className=" bg-green-400 rounded-lg p-2">Addproduct</button>
          </div>
              </Link>
        <button className=" text-xl" onClick={() => {isfavouret?removeFromewhishlist(prodect._id) : addwhishlist(prodect)}}>
              <i className={`fas fa-heart ${isfavouret? 'text-red-500' : 'text-gray-950'}`}></i>
            </button>
          </div>
          )

        }
      )}

      
      </div>
    
      </div>
      {/* <ReactPaginate
      previousLabel={<i className="fa-solid fa-backward"></i>}
      previousClassName="text-green-700 text-xl"
      activeClassName="text-green-700"
      nextLabel={<i className="fa-solid fa-forward"></i>}
      nextClassName="flex justify-center my-10 gap-5 text-xl"
      // pageCount={allprodect.metadata.numberOfPages}
      onPageChange={handelpage}
      forcePage={page-1}
      /> */}
    </>

  )
}
