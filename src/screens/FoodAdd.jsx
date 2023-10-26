import { useState } from "react";
import { TextInput, View, Text, Alert } from "react-native";
import Member from "../components/Member";
import * as SecureStore from "expo-secure-store";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useMember } from "../stores/memberContext";

export default function FoodAdd({route, navigation}) {
  console.log("data is ", route.params);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const { members, updateMember } = useMember();

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity className="mx-5" onPress={() => postItembyId()}>
        <Text className="text-xl font-semibold">Add</Text>
      </TouchableOpacity>
    ),
  });

  const postItembyId = async () => {
    const token = await SecureStore.getItemAsync("token");
    const res = await fetch(`http://localhost:3000/bill/${route.params.id}/item/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body:JSON.stringify({
        name: name,
        price: parseInt(price),
        color: '#ffff',
        member: []
      })
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      Alert.alert("Create Item in bill Success");
      navigation.goBack;
    } else {
      const err = await res.json();
      console.log(err);
    }
  }


  return (
    <View className="m-[20px]">
      <View className=" border-b-[0.25px] flex flex-row justify-between items-center py-1">
        <Text className="font-semibold">Name</Text>
        <TextInput
          value={name}
          placeholder="Enter Name"
          className="p-2 rounded-lg w-28 h-8 ml-2"
          onChangeText={(e) => setName(e)}
        />
      </View>
      <View className=" border-b-[0.25px] flex flex-row justify-between items-center py-1">
        <Text className="font-semibold">Pice</Text>
        <TextInput
          value={price}
          placeholder="Enter Pices"
          className="p-2 rounded-lg w-28 h-8 ml-2"
          onChangeText={(e) => setPrice(e)}
        />
      </View>
      <View className=" max-h-[250px] h-[250px] mt-4 ">
        <Member data={members} type="edit" ></Member>
      </View>
    </View>
  );
}
