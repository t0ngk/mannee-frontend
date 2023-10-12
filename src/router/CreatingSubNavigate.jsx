import { createStackNavigator } from "@react-navigation/stack";

import { Button } from "react-native";

import Subscriptions from "../screens/Subscriptions";

const Stack = createStackNavigator();

export default function CreatingSubNavigate() {
    return (
        <Stack.Navigator initialRouteName="AllSubsciptions">
            <Stack.Screen name="AllSubsciptions" component={Subscriptions} 
            options={({ navigation, props }) => ({
                headerLeft: () => (
                    <Button title="Setting" />
                ),

                headerRight: () => (
                    <Button title="Add" onPress={() => navigation.navigate('CreatingSub')} />
                )
            })} />
        </Stack.Navigator>
    );
}