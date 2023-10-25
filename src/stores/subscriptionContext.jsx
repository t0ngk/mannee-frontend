import { createContext, useContext, useState } from 'react';
import * as SecureStore from "expo-secure-store";

const context = createContext();

export function SubscriptionContextProvider({ children }) {
    const [subscription, setSubscription] = useState([]);
    const updateSubscription = (subscription) => {
        console.log("================subscription-API================");
        console.log(subscription);
        setSubscription(subscription);
    };

    const fetchSubscription = async () => {
        const token = await SecureStore.getItemAsync("token");
        const response = await fetch("http://localhost:3000/subscription", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setSubscription(data);
        }
    };

    return (
        <context.Provider value={{ subscription, updateSubscription, fetchSubscription }}>
            {children}
        </context.Provider>
    )
}

export function useSubscription() {
    return useContext(context);
}
