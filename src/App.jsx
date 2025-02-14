
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Componante/Layout/Layout'
import Home from './Componante/Home/Home'
import Register from './Componante/Register/Register'
import Login from './Componante/Login/Login'
import Notfond from './Componante/Notfund/Notfond'
import AuthContextprovider from './Context/AuthContext'
import Categores from './Componante/Categores/Categores'
import Brands from './Componante/Brands/Brands'
import ProtectRoute from './Componante/ProtectRoute/ProtectRoute'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProdectDetails from './Componante/ProdectDetails/ProdectDetails'
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast'
import Cart from './Componante/Cart/Cart'
import Order from './Componante/Order/Order'
import { Offline } from 'react-detect-offline'
import BrandsDelelis from './Componante/ProdectDetails/BrandsDelelis/BrandsDelelis'
import CategoresDitilels from './Componante/Categores/CategoresDitilels'
import Wishlist from './Componante/Wishlist/Wishlist'
import Forgitpassword from './Componante/ForgitPassword/ForgitPassword'
import Prodect from './Componante/Prodect/Prodect'
import CodeForgitpassword from './Componante/CodeForgitpassword/CodeForgitpassword'
import WishlistContextProvider from './Context/WishlistContext'
import ReasetPassword from './Componante/ReasetPassword/ReasetPassword'




const client = new QueryClient();


function App() {



 const route= createHashRouter([
    {path: '', element: <Layout/> ,children:[
      {index: true, element: <ProtectRoute><Home/></ProtectRoute>},
      {path: 'Home', element:<ProtectRoute><Home/></ProtectRoute>},
      {path:'Categores' , element:<ProtectRoute><Categores/></ProtectRoute> },
      {path:'CategoresDitilels/:id' , element:<ProtectRoute><CategoresDitilels/></ProtectRoute> },
      {path:'Brands' , element: <ProtectRoute><Brands/></ProtectRoute>},
      {path:'BrandsDelelis/:id' , element: <ProtectRoute><BrandsDelelis/></ProtectRoute>},
      {path:'Prodect' , element: <ProtectRoute><Prodect/></ProtectRoute>},

      {path:'Cart' , element: <ProtectRoute><Cart/></ProtectRoute>},
      {path:'Wishlist' , element: <ProtectRoute><Wishlist/></ProtectRoute>},
      {path:'Order' , element: <ProtectRoute><Order/></ProtectRoute>},
      // {path:'ProdectDetails/:id/:Categores' , element: <ProtectRoute><ProdectDetails/></ProtectRoute>},
      {path:'ProdectDetails/:id' , element: <ProtectRoute><ProdectDetails/></ProtectRoute>},
      {path: 'Login', element: <Login/>},
      {path: 'Forgitpassword', element: <Forgitpassword/>},
      {path: 'CodeForgitpassword', element: <CodeForgitpassword/>},
      {path: 'ReasetPassword', element: <ReasetPassword/>},
      {path: 'Register', element: <Register/>},
      {path: '*', element: <Notfond/>},
    ]},
  ]);




  return (
<>
{/* <h1 className='bg-red-600'>e-commerse</h1>
<h1>e-commerse</h1> */}

<QueryClientProvider client={client}>

<AuthContextprovider>

<WishlistContextProvider>
  <CartContextProvider>


<RouterProvider router={route} />


  </CartContextProvider>

</WishlistContextProvider>

</AuthContextprovider>

</QueryClientProvider>

<Toaster/>


<Offline>
  <div className='bg-blue-50 p-5 text-white fixed start-0 end-0 w-full h-full'>
    <h1>Only shown offline surprise!</h1>
  </div>
  </Offline>


</>
  )
}

export default App
