import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { Button } from "react-native";

import CreatingSubNavigate from "./CreatingSubNavigate";
import Bill from "../screens/Bill";
import Friend from "../screens/Friend";

const tab = createBottomTabNavigator();

export default function MainNavigation() {
    return (

        <tab.Navigator initialRouteName="Subscriptions" >
            <tab.Screen name="Subscriptions" component={CreatingSubNavigate} options={{ headerShown: false }} />
            <tab.Screen name="Bill" component={Bill} />
            <tab.Screen name="Friend" component={Friend} />
        </tab.Navigator>

    );
}