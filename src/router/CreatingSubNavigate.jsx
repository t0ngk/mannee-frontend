import { createStackNavigator } from "@react-navigation/stack";

import { Alert, Button, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from '@expo/vector-icons';
import ColorPicker from "react-native-wheel-color-picker";
import Subscriptions from "../screens/Subscriptions";
import DetailSubscription from "../screens/DetailSubscription";
import BillSummary from "../screens/BillSummary";

const Stack = createStackNavigator();

export default function CreatingSubNavigate() {
  return (
    <Stack.Navigator initialRouteName="AllSubsciptions">
      <Stack.Screen
        name="AllSubsciptions"
        component={Subscriptions}
        options={({ navigation, props }) => ({
          headerBackTitleVisible: false,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('CreatingSub')}>
              <Text className="px-4 text-4xl font-light">+</Text>
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => Alert.alert('Profile')}>
              <View className="mx-4">
                <Ionicons name="ios-person-outline" size={24} color="black" />
              </View>
            </TouchableOpacity>
          )
          ,
          headerTitle: "Subscriptions",
          headerTitleStyle: {
            alignSelf: "center",
            fontWeight: "bold",
            fontSize: 24,
          },
        })}
      />
      <Stack.Screen
        name="DetailSub"
        component={DetailSubscription}
        options={({ route, navigation }) => {
          return {
            headerTitle: 'Subscription',
            headerTitleStyle: {
              alignSelf: "center",
              fontWeight: "bold",
              fontSize: 24,
            },
            headerBackTitleVisible: false,
          };
        }}
      />
      <Stack.Screen
        name="BillSummary"
        component={BillSummary}
        options={({ navigation, props }) => ({
          headerRight: () => (
            <Button
              title="Edit"
              onPress={() => navigation.navigate("BillEdit")}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}
