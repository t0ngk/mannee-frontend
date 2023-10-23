import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { Alert, Button, TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

import Badge from "../components/Badge";

import CreatingSubNavigate from "./CreatingSubNavigate";
import Bill from "../screens/Bill";
import Friends from "../screens/Friends";
import { useState } from "react";

const tab = createBottomTabNavigator();

const data = [{
  id: 1,
  name: "User1",
  img: "https://minio.haxter.ee/ctx-betterexperience-prd/uploads/images/221ddf5a-642b-4ace-b145-f9426ab2ad03_original.jpg",
},
{
  id: 2,
  name: "User2",
  img: "https://play-lh.googleusercontent.com/cShys-AmJ93dB0SV8kE6Fl5eSaf4-qMMZdwEDKI5VEmKAXfzOqbiaeAsqqrEBCTdIEs",
}
]

export default function MainNavigation() {
  const [notificationCount, setNotificationCount] = useState(2);
  return (
    <tab.Navigator initialRouteName="Subscriptions">
      <tab.Screen
        name="Subscriptions"
        component={CreatingSubNavigate}
        options={{
          headerShown: false,
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
          <TouchableOpacity onPress={() => navigation.navigate("AddFriends")}>
            <View className="mx-4">
              <Text className="text-4xl font-light">+</Text>
            </View>
          </TouchableOpacity>
        ),
        tabBarIcon: () => {
          return <Feather name="users" size={24} color="black" />;
        },
        headerLeft: () => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate("BoxRequstFriends", {data: data})}>
              <View className="mx-4">
                {notificationCount > 0 &&<Badge count={notificationCount} />}
                <Octicons name="person-add" size={24} color="black" />
              </View>
            </TouchableOpacity>
          )
        },
      })} />
    </tab.Navigator>
  );
}
