import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token:'',
  isAuthenticated:false,
  authenticate:()=>{},
  logout:()=>{}
});





function AuthContextProvider({children}){

  const [authToken,setAuthToken]=useState();
  
  async function getStoredToken(){
    try{
    const tokenStored = await AsyncStorage.getItem('token')
    if(tokenStored){
      authenticate(tokenStored)
    }
    }
    catch(e){
      console.log(e)
    }
  
  }
  useEffect(()=>{
    getStoredToken();
  },[])
  
  function authenticate(token){
    setAuthToken(token)
  }

  async function logout(){
    await AsyncStorage.clear();
    setAuthToken(null)
  }

  const value = {
    token:authToken,
    isAuthenticated:!!authToken,
    authenticate:authenticate,
    logout:logout
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


export default AuthContextProvider;
