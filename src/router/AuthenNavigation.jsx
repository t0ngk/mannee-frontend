import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

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
import Profile from "../screens/Profile";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
import { useUser } from "../stores/userContext";
const Stack = createStackNavigator();

export default function AuthNavigation({ navigator }) {
  const [token, setToken] = useState('');
  useEffect(() => {
    console.log(isSignedIn())
    isSignedIn();
  }, [token]);

  const isSignedIn = async () => {
    const pass = await SecureStore.getItemAsync('token');
    if (pass != null) {
      setToken(token);
      console.log('User Token is : ' + token)
      return true;
    }
    else {
      setToken('');
      console.log('User Token is : ' + token)
      return false;
    };
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {token == '' ? (<Stack.Group initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registor" component={Registor} />
        </Stack.Group>) : null }
          <Stack.Screen name="MainNavigation" component={MainNavigation} />
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
            }}
          />
          <Stack.Screen
            name="BillEdit"
            component={BillEdit}
            options={{
              headerShown: true,
              headerTitle: "Edit Bill",
              headerBackTitle: " ",
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
            }}
          />
          <Stack.Screen
            name="FoodEdit"
            component={FoodEdit}
            options={{
              headerShown: true,
              headerTitle: "Edit Food",
              headerBackTitle: " ",
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
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: true,
              headerTitle: "Profile",
              headerBackTitle: " ",
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
