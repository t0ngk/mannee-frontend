import { createContext, useContext, useState } from "react";

const context = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const updateUser = (user) => {
    console.log("================User-API================");
    console.log(user);
    setUser(user);
  };
  return (
    <context.Provider value={{ user, updateUser }}>{children}</context.Provider>
  );
}

export function useUser() {
  return useContext(context);
}
