"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import EnlargedImage from "@/components/common/EnlargedImage";

interface ContextOptions {
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

const EnlargedImageContext = React.createContext<ContextOptions | null>(null);

const EnlaredImageProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (imageUrl) setImageUrl(null);
  }, [router.pathname]);

  return (
    <EnlargedImageContext.Provider value={{ setImageUrl }}>
      {imageUrl ? <EnlargedImage imageUrl={imageUrl} /> : null}
      {children}
    </EnlargedImageContext.Provider>
  );
};

export default EnlaredImageProvider;

export const useEnlargedImageContext: () => ContextOptions = () => {
  const context = React.useContext(EnlargedImageContext);
  if (!context)
    throw new Error(
      "Modal context can only be used within enlarged image provider"
    );
  return context;
};
