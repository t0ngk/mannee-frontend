import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { Alert, Button, TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';

import CreatingSubNavigate from "./CreatingSubNavigate";
import Bill from "../screens/Bill";
import Friends from "../screens/Friends";

const tab = createBottomTabNavigator();

export default function MainNavigation() {
  return (
    <tab.Navigator initialRouteName="Subscriptions">
      <tab.Screen
        name="Subscriptions"
        component={CreatingSubNavigate}
        options={{ headerShown: false,
          tabBarIcon: () => {
            return <Ionicons name="cash-outline" size={24} color="black" />;
          }
        }}
      />
      <tab.Screen
        name="Bills"
        component={Bill}
        options={({ navigation, props }) => ({
          headerLeft: () => <Button title="Setting" />,
          headerRight: () => (
            <Button title="+" onPress={() => navigation.navigate("BillAdd")} />
          ),
          tabBarIcon: () => {
            return <MaterialCommunityIcons name="clipboard-check-outline" size={24} color="black" />;
          }
        })}
      />
      <tab.Screen name="Friends" component={Friends} options={({ navigation, props }) => ({
        headerRight: () => (
          <TouchableOpacity onPress={()=> navigation.navigate("AddFriends")}>
            <View className="mx-4">
              <Text className="text-4xl font-light">+</Text>
            </View>
          </TouchableOpacity>
        ),
        tabBarIcon: () => {
          return <Feather name="users" size={24} color="black" />;
        }
      })} />
    </tab.Navigator>
  );
}
