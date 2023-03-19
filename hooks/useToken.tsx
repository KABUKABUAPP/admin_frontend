import { useState } from "react";
import Cookie from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";

const useToken = () => {

  const token = Cookie.get(ACCESS_TOKEN)


  return { token };
};

export default useToken;
