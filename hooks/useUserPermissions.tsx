import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import { USER_TOKEN } from "@/constants";
import { User, UserPermissions } from "@/models/User";

const useUserPermissions = () => {
  const [userPermissions, setUserPermissions] =
    useState<UserPermissions | null>();

  useEffect(() => {
    const storedToken = Cookies.get(USER_TOKEN);

    if (storedToken) {
      const parsedToken: User = JSON.parse(storedToken);
      setUserPermissions(parsedToken.permissions);
    }
  }, []);

  return { userPermissions }
};

export default useUserPermissions;
