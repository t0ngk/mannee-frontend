import { createContext, useContext, useState } from "react";

const context = createContext();

export function MemberContextProvider({ children }) {
  const [members, setMembers] = useState([]);
  const updateMember = (members) => {
    console.log("================Member-API================");
    console.log(members);
    setMembers(members);
  };
  return (
    <context.Provider value={{ members, updateMember }}>{children}</context.Provider>
  );
}

export function useMember() {
  return useContext(context);
}
