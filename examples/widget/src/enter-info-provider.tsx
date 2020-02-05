import React, { useState, useContext, useEffect, useRef } from "react";

export const EnterInfoContext = React.createContext<{
  email: string;
  setEmail: (e: string) => any;
  phone: string;
  setPhone: (e: string) => any;
  name: string;
  setName: (e: string) => any;
}>({
  email: "",
  setEmail: (s: string) => {},
  phone: "",
  setPhone: (s: string) => {},
  name: "",
  setName: (s: string) => {}
});

export const useEnterInfo = () => useContext(EnterInfoContext);

export const EnterInfoProvider = ({ children }: any) => {
  const { info: email, setInfo: setEmail } = useInfo("LAST_EMAIL");
  const { info: phone, setInfo: setPhone } = useInfo("LAST_PHONE");
  const { info: name, setInfo: setName } = useInfo("LAST_NAME");

  return (
    <EnterInfoContext.Provider
      value={{
        email,
        setEmail,
        phone,
        setPhone,
        name,
        setName
      }}
    >
      {children}
    </EnterInfoContext.Provider>
  );
};

function useInfo(storageKey: string) {
  const lastFromStorage = localStorage
    ? localStorage.getItem(storageKey)
    : null;

  const [info, setInfo] = useState<string>(lastFromStorage || "");

  useEffect(() => {
    if (localStorage) {
      localStorage.setItem(storageKey, info);
    }
  }, [storageKey, info]);

  return { info, setInfo };
}
