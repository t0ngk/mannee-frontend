import Member from "../components/Member";
import {
  Image,
  View,
  Text,
  Button,
  FlatList,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { useColor } from "../stores/colorContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";

const Data = []
export default function BillAdd({ navigation, route }) {
  const { color, setColor } = useColor();
  const [name, setName] = useState("");


const postbill = async () => {
  const token = await SecureStore.getItemAsync("token");
  const res = await fetch(`http://localhost:3000/bill/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      color: color,
    }),
  });
  if (res.ok) {
    const data = await res.json();
    console.log(data);
    Alert.alert("Create Bill Success");
    navigation.goBack();
  } else {
    const err = await res.json();
    console.log(err);
  } 
}

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity className="mx-5" onPress={() => postbill()}>
        <Text className="text-xl font-semibold">Add</Text>
      </TouchableOpacity>
    ),
  });

  return (
    <>
      <View className="my-2 m-[20px] h-full">
        <View className="border p-2 rounded-md border-[#CFCFCF]">
          <View className=" border-b-[0.25px] flex flex-row justify-between items-center py-1">
            <Text className="font-semibold">Name</Text>
            <TextInput
              value={name}
              placeholder="Enter Name"
              className="p-2 rounded-lg w-28 h-8 ml-2"
              onChangeText={(e) => setName(e)}
            />
          </View>
          <View className="border-t-[0.25px] flex flex-row justify-between items-center py-1">
            <View className="flex flex-row items-center">
              <Text className="font-semibold">Color</Text>
            </View>
            <View className="flex flex-row items-center">
              <View
                className="mx-2 w-6 h-6 rounded-full"
                style={{ backgroundColor: color }}
              ></View>
              <Button
                title=">"
                onPress={() =>
                  navigation.navigate("ColorPick", { page: "BillAdd" })
                }
              />
            </View>
          </View>
        </View>
        <View className=" max-h-[250px] h-[250px] mt-4 ">
          <Member
            data={Data}
            stage="add"
            type="edit"
            memberType="delete"
          ></Member>
        </View>
      </View>
    </>
  );
}
