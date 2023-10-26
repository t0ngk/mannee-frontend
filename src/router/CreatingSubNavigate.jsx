import { createStackNavigator } from "@react-navigation/stack";

import { Button, Text, TouchableOpacity, View } from "react-native";

import ColorPicker from "react-native-wheel-color-picker";
import Subscriptions from "../screens/Subscriptions";
import DetailSubscription from "../screens/DetailSubscription";
import BillSummary from "../screens/BillSummary";
import { useUser } from "../stores/userContext";


const Stack = createStackNavigator();

export default function CreatingSubNavigate() {
  const {user} = useUser();
  return (
    <Stack.Navigator initialRouteName="AllSubsciptions">
      <Stack.Screen
        name="AllSubsciptions"
        component={Subscriptions}
        options={({ navigation, props }) => ({
          headerBackTitleVisible: false,
          headerRight: () => (
            <Button
              title="Add"
              onPress={() => navigation.navigate("CreatingSub")}
            />
          ),
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
            title: route.params.name,
            headerTitleStyle: {
              alignSelf: "center",
              fontWeight: "bold",
              fontSize: 24,
            },
            headerBackTitleVisible: false,
            headerRight: () => {
              if (user.id != route.params.ownerId) {
                return null;
              }
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("EditSubscription", {
                      id: route.params.id,
                      name: route.params.name,
                      price: route.params.price,
                      img: route.params.img,
                      color: route.params.color,
                      firstbill: route.params.firstbill,
                      cycleFreq: route.params.cycleFreq,
                      cycle: route.params.cycle,
                      daytopay: route.params.daytopay,
                      member: route.params.member,
                      page: "EditSubscription",
                    });
                  }}
                >
                  <View className="mx-4">
                    <Text className="text-lg font-semibold">Edit</Text>
                  </View>
                </TouchableOpacity>
              );
            },
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
