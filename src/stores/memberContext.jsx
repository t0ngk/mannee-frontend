import { createContext, useContext, useState } from "react";

const context = createContext();

export function MemberContextProvider({ children }) {
  const [member, setMember] = useState(null);
  const updateMember = (member) => {
    console.log("================Member-API================");
    console.log(member);
    setMember(member);
  };
  return (
    <context.Provider value={{ member, updateMember }}>{children}</context.Provider>
  );
}

export function useMember() {
  return useContext(context);
}
