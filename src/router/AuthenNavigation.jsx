import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from 'expo-secure-store';

import { TouchableOpacity, View, Text, Alert, Button } from "react-native";

import Login from "../screens/Login";
import Registor from "../screens/Registor";
import MainNavigation from "./MainNavigation";
import CreatingSub from "../screens/CreatingSub";
import OnCreatingSub from "../screens/OnCreatingSub";
import ColorPick from "../screens/ColorPick";
import BillAdd from "../screens/BillAdd";
import BillEdit from "../screens/BillEdit";
import AddMember from "../screens/AddMember";
import FoodAdd from "../screens/FoodAdd";
import FoodEdit from "../screens/FoodEdit";
import EditSubscription from "../screens/EditSubscription";
import AddFriends from "../screens/AddFriends";
import BoxRequstFriends from "../screens/BoxRequstFriends";
import ImagePickerExample from "../components/ImgPicker";
import { useEffect } from "react";
const Stack = createStackNavigator();

export default function AuthNavigation() {

  const isSignedIn = async () => {
    const token = await SecureStore.getItemAsync('token');
    console.log('User Token is : ' + token)
    return token;
  };


  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >

        {isSignedIn() == null ? (<Stack.Group initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registor" component={Registor} />
        </Stack.Group>) : (
        <Stack.Screen name="MainNavigation" component={MainNavigation} />)}
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen name="CreatingSub" component={CreatingSub} />
          <Stack.Screen
            name="NewSubscription"
            component={OnCreatingSub}
            options={{
              headerShown: true,
              headerTitle: "New Subscription",
              headerBackTitle: " ",
              headerRight: () => <Button title="Add" />,
            }}
          />
          <Stack.Screen
            name="ColorPick"
            component={ColorPick}
            options={{
              headerShown: true,
              headerTitle: "Pick a Color",
              headerBackTitle: " ",
            }}
          />
          <Stack.Screen
            name="EditSubscription"
            component={EditSubscription}
            options={{
              headerShown: true,
              headerTitleStyle: {
                alignSelf: "center",
                fontSize: 22,
              },
              headerTitle: "Edit Subscription",
              headerBackTitle: " ",
            }}
          />
          <Stack.Screen
            name="BillAdd"
            component={BillAdd}
            options={{
              headerShown: true,
              headerTitle: "New Bill",
              headerBackTitle: " ",
              headerRight: () => (
                <Button
                  title="Add"
                  onPress={() => {
                    alert("add new Bill");
                  }}
                />
              ),
            }}
          />
          <Stack.Screen
            name="BillEdit"
            component={BillEdit}
            options={{
              headerShown: true,
              headerTitle: "Edit Bill",
              headerBackTitle: " ",
              headerRight: () => <Button title="Save" />,
            }}
          />
          <Stack.Screen
            name="AddMember"
            component={AddMember}
            options={{
              headerShown: true,
              headerTitle: "Add Member",
              headerBackTitle: " ",
              headerRight: () => <Button title="Add" />,
            }}
          />
          <Stack.Screen
            name="FoodAdd"
            component={FoodAdd}
            options={{
              headerShown: true,
              headerTitle: "New Food",
              headerBackTitle: " ",
              headerRight: () => <Button title="Add" />,
            }}
          />
          <Stack.Screen
            name="FoodEdit"
            component={FoodEdit}
            options={{
              headerShown: true,
              headerTitle: "Edit Food",
              headerBackTitle: " ",
              headerRight: () => <Button title="Save" />,
            }}
          />
          <Stack.Screen
            name="AddFriends"
            component={AddFriends}
            options={{
              headerShown: true,
              headerTitle: "Add Friend",
              headerBackTitle: " ",
            }}
          />
          <Stack.Screen
            name="BoxRequstFriends"
            component={BoxRequstFriends}
            options={{
              headerShown: true,
              headerTitle: "Friend Request",
              headerBackTitle: " ",
            }}
          />
          <Stack.Screen
            name="PickIcon"
            component={ImagePickerExample}
            options={{
              headerShown: true,
              headerTitle: "Icon Image",
              headerBackTitle: " ",
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
