// import axios from "axios";
import axios from "axios";
import { useFormik } from "formik"
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';





export default function Register() {
const navigate = useNavigate();
const [ErrorMassegs,setErrorMassegs] =useState(null);
const [issuccess,setissuccess] =useState(false);
const [isCliced,setisCliced] =useState(false);


let user = {
  name: '',
  phone:'',
  email:'',
  password:'',
  rePassword:'',
}

async function submet(values) {
  // console.log("call api", values);
  setisCliced(true);
await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)

  .then(function () {
    // console.log('true', x);
    setissuccess(true);
    setisCliced(false);


    setTimeout(() => {
      navigate('/Login');
    }, 2000);


  })
  .catch(function (x) {
    // console.log('false', x);
    setErrorMassegs(x.response.data.message);
    setisCliced(false);

    setTimeout(() => {
      setErrorMassegs(null);
    }, 2000);
    
  });

}


//hook
 const regesterformik= useFormik({
    initialValues:user,
    onSubmit:submet,


//   validate: function (alldata) {
//     const errors = {};
//     const nameRegex = /^[A-Z][a-z]{4,8}$/;
//     const phoneRegex = /^(20)?01[0125][0-9]{8}$/;
//     //.match(nameRegex)
//     //nameRegex.test("mohamed")

//     if (!nameRegex.test(alldata.name)) {
//       errors.name = 'name must start whit capital letter end letter 10';
//     }
//     if (!phoneRegex.test(alldata.phone)) {
//       errors.phone = 'phone must egyptain number';
//     }
//     if (!alldata.email.includes('@') || !alldata.email.includes('.') ) {
//       errors.email = 'invalid email';
//     }
//     if (alldata.password.length < 6 || alldata.password.length > 12 ) {
//       errors.password = 'password mast be 6 to 12 number';
//     }
//     if (alldata.password !== alldata.repassword) {
//       errors.repassword = 'repassword not match whit password';
//     }


// // console.log(errors);


// return errors;


//   },

  validationSchema: yup.object().shape({

    name: yup.string().required('this is name').min(3, 'minmum must 3 character').max(12, 'maxmum must 3 character'),
    phone:yup.string().required('this is phone').matches(/^01[0125][0-9]{8}$/),
    email:yup.string().required('this is email'),
    password:yup.string().required().min(6).max(12),
    rePassword:yup.string().required().oneOf([yup.ref('password')], 'repassword not match'),
  }),

  });

  return (<>

<form onSubmit={regesterformik.handleSubmit} className="max-w-md mx-auto p-5 mt-16">

    {issuccess?  <div className="p-2 mb-4 text-sm text-green-700 rounded-lg dark:bg-gray-800 dark:text-red-400" role="alert">
      success
    </div> : ''}

    {ErrorMassegs? <div className="p-2 mb-4 text-sm text-red-700 rounded-lg dark:bg-gray-800 dark:text-red-400" role="alert">
      {ErrorMassegs}
    </div>: ''}

  <h1 className=" text-center text-green-600">Register New:</h1>


  <div className="relative z-0 w-full mb-10 group">
    <input type="text" value={regesterformik.values.name} onBlur={regesterformik.handleBlur} onChange={(events) => {regesterformik.setFieldValue('name', events.target.value); if(!regesterformik.touched.name){regesterformik.setFieldTouched('name',true)}}} name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
    {regesterformik.errors.name && regesterformik.touched.name ? 
    <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {regesterformik.errors.name}
    </div> : <div className="p-2 mb-4 text-sm text-red-800 rounded-lg">yes</div> }
  </div>


  <div className="relative z-0 w-full mb-10 group">
    <input autoComplete="username" type="email" value={regesterformik.values.email} onBlur={regesterformik.handleBlur} onChange={(events) => {regesterformik.setFieldValue('email', events.target.value); if(!regesterformik.touched.email){regesterformik.setFieldTouched('email',true)}}} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
    {regesterformik.errors.email && regesterformik.touched.email ? 
    <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {regesterformik.errors.email}
    </div> : <div className="p-2 mb-4 text-sm text-red-800 rounded-lg">yes</div> }
  </div>


  <div className="relative z-0 w-full mb-10 group">
    <input autoComplete="new-password" type="password" value={regesterformik.values.password} onBlur={regesterformik.handleBlur} onChange={(events) => {regesterformik.setFieldValue('password', events.target.value); if(!regesterformik.touched.password){regesterformik.setFieldTouched('password',true)}}} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
    {regesterformik.errors.password && regesterformik.touched.password ? 
    <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {regesterformik.errors.password}
    </div> : <div className="p-2 mb-4 text-sm text-red-800 rounded-lg">yes</div> }
  </div>


  <div className="relative z-0 w-full mb-10 group">
    <input autoComplete="new-password" type="password" value={regesterformik.values.rePassword} onBlur={regesterformik.handleBlur} onChange={(events) => {regesterformik.setFieldValue('rePassword', events.target.value); if(!regesterformik.touched.rePassword){regesterformik.setFieldTouched('rePassword',true)}}} name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
    {regesterformik.errors.rePassword && regesterformik.touched.rePassword? 
    <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {regesterformik.errors.rePassword}
    </div> : <div className="p-2 mb-4 text-sm text-red-800 rounded-lg">yes</div> }
    </div>
  
  
  <div className="relative z-0 w-full mb-10 group">
    <input type="tel" value={regesterformik.values.phone} onBlur={regesterformik.handleBlur} onChange={regesterformik.handleChange} name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
    {regesterformik.errors.phone && regesterformik.touched.phone ? 
    <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {regesterformik.errors.phone}
    </div> : <div className="p-2 mb-4 text-sm text-red-800 rounded-lg">yes</div> }
  </div>


  <button type="submit" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    
    { !isCliced ? 'Submit' : <ColorRing
    visible={true}
    height="30"
    width="30"
    ariaLabel="color-ring-loading"
    wrapperStyle={{}}
    wrapperClass="color-ring-wrapper"
    colors={[' #fff', '#fff', '#fff', '#fff', '#fff']}
    /> }
    
    </button>
</form>

</>
  )
}
