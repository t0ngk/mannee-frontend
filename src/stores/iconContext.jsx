import { createContext, useContext, useState } from "react";

const context = createContext();

export function IconContextProvider({ children }) {
  const [icon, setIcon] = useState("#FFFFFF");
  const updateIcon = (icon) => {
    console.log("================Icon-API================");
    console.log(icon);
    setIcon(icon);
  };
  return (
    <context.Provider value={{ icon, updateIcon }}>{children}</context.Provider>
  );
}

export function useIcon() {
  return useContext(context);
}
