import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Button } from "react-native";

import Login from "../screens/Login";
import Registor from "../screens/Registor";
import MainNavigation from "./MainNavigation";
import CreatingSub from "../screens/CreatingSub";
import OnCreatingSub from "../screens/OnCreatingSub";
import ColorPick from "../screens/ColorPick";

const Stack = createStackNavigator();

export default function AuthNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Group initialRouteName="Login">
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Registor" component={Registor} />
                    <Stack.Screen name="MainNavigation" component={MainNavigation} />
                </Stack.Group>
                <Stack.Group screenOptions={{ presentation: 'modal' }}>
                    <Stack.Screen name="CreatingSub" component={CreatingSub} />
                    <Stack.Screen name="NewSubscription" component={OnCreatingSub} options=
                    {{headerShown: true , headerTitle: 'New Subscription', headerBackTitle: ' ' , headerRight: () => (
                        <Button title="Add"/>
                    ) }}/>
                    <Stack.Screen name="ColorPick" component={ColorPick} options={{headerShown: true, headerTitle: 'Pick a Color', headerBackTitle: ' '}}/>
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
}