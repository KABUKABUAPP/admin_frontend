import React, { useState } from "react";
import CallCard from "@/components/common/CallCard";

interface ContextOptions {
  isCalling: boolean;
  setIsCalling: React.Dispatch<React.SetStateAction<boolean>>;
}

const CallContext = React.createContext<ContextOptions | null>(null);

const CallProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isCalling, setIsCalling] = useState<boolean>(false);

  return (
    <CallContext.Provider value={{ isCalling, setIsCalling }}>
      {isCalling ? <CallCard fullname="John Doe" imageUri="/testUser.jpg"/> : null}
      {children}
    </CallContext.Provider>
  );
};

export default CallProvider;

export const useCallContext: () => ContextOptions = () => {
  const context = React.useContext(CallContext);
  if (!context)
    throw new Error("Call context can only be used within Call provider");
  return context;
};
