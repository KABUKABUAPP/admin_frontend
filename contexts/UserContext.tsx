import React, { useState, useEffect } from "react";
import { User } from "../models/User";
import { USER_TOKEN } from "@/constants";
import Cookies from "js-cookie";

interface ContextOptions {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = React.createContext<ContextOptions | null>(null);

const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(()=>{
    const userData = Cookies.get(USER_TOKEN)
    if(userData) {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUserContext: () => ContextOptions = () => {
  const context = React.useContext(UserContext);
  if (!context)
    throw new Error("User context can only be used within user provider");
  return context;
};
