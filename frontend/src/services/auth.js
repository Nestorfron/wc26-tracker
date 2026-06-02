import {
    postData,
    loginUser,
  } from "./api";
  
  export const login = (
    correo,
    password
  ) => loginUser(correo, password);
  
  export const register = (
    payload
  ) =>
    postData(
      "/register",
      payload
    );
  
  export const logout = () =>
    postData("/logout", {});