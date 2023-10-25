import { createContext, useState, useContext } from "react";
import * as SecureStore from 'expo-secure-store';
const context = createContext();

export function SubConProvider({ children }) {
  const [subcon, setSubcon] = useState({
  });

  const updateSubcon = (newSubcon) => {
    console.log("=========================Update=========================")
    console.log(newSubcon)
    setSubcon(newSubcon);
  };

  const reloadSubcon = async () => {
    const token = await SecureStore.getItemAsync('token');
    const res = await fetch('https://mobile.t0ng.dev/subscription', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    if (res.ok) {
      const data = await res.json()
      updateSubcon(data)
    }
  }

  const [bill, setBill] = useState({
  });

  const updateBill = (newBill) => {
    setBill(newBill);
  };
  return <context.Provider value={{
    subcon,
    updateSubcon,
    bill,
    updateBill,
    reloadSubcon,
  }}>{children}</context.Provider>;
}

export function useSubcon() {
  return useContext(context);
}