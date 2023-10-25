import { createContext, useContext, useState } from 'react';

const context = createContext();

export function SubscriptionContextProvider({ children }) {
    const [subscription, setSubscription] = useState([]);
    const updateSubscription = (subscription) => {
        console.log("================subscription-API================");
        console.log(subscription);
        setSubscription(subscription);
    };

    const fetchSubscription = async () => {
        const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzU2YWFjMzE0MWIxMTNkZmVkYWExZiIsImlhdCI6MTY5ODAwNDA4Mn0.UFyhW-F0EXt8MBoqbbsSVwq-bQiWRntWxmGI4JFtMf8`;
        const response = await fetch("https://mobile.t0ng.dev/subscription", {
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