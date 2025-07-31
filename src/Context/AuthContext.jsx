import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const authcontext = createContext();

//token
export default function AuthContextprovider({ children }) {
  // const [useToken , setUseToken] = useState(localStorage.getItem('token'));is the verey bad
  //lazy initializtion = useEffect
  // const [useToken , setUseToken] = useState(function(){return localStorage.getItem('token')});
  const [useToken, setUseToken] = useState(null);

  const [userData, setUserData] = useState(null);

  function decryptUserToken() {
    const res = jwtDecode(useToken);
    setUserData(res);
  }
  useEffect(() => {
    if (useToken) {
      decryptUserToken();
    }
  }, [useToken]);

  useEffect(() => {
    //bar default => componantDidMount
    const token = localStorage.getItem("token");
    if (token != null) {
      setUseToken(token);
    }
  }, []);
  return (
    <authcontext.Provider
      value={{
        setUseToken,
        useToken,
        setUserData,
      }}
    >
      {children}
    </authcontext.Provider>
  );
}
