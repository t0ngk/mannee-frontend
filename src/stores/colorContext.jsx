import { createContext, useContext, useState } from "react";

const context = createContext();

export function ColorContextProvider({ children }) {
  const [color, setColor] = useState("#FFFFFF");
  const updateColor = (color) => {
    console.log("================Color-API================");
    console.log(color);
    setColor(color);
  };
  return (
    <context.Provider value={{ color, updateColor }}>{children}</context.Provider>
  );
}

export function useColor() {
  return useContext(context);
}
