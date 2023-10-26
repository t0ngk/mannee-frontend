import { useState } from "react";
import { TextInput, View, Text, Alert } from "react-native";
import Member from "../components/Member";
import * as SecureStore from "expo-secure-store";
import { TouchableOpacity } from "react-native-gesture-handler";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useMember } from "../stores/memberContext";
import { useUser } from "../stores/userContext";

export default function FoodEdit({ route, navigation }) {
  const { user } = useUser();
  const { members, updateMember } = useMember();

  navigation.setOptions({
    title: route.params.itemid.id == "new" ? "Add Food" : "Edit Food",
    headerRight: () =>
      route.params.itemid.id == "new" ? (
        <TouchableOpacity className="mx-5" onPress={() => addItem()}>
          <Text className="text-xl font-semibold">Add</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity className="mx-5" onPress={() => eddititem()}>
          <Text className="text-xl font-semibold">Edit</Text>
        </TouchableOpacity>
      ),
  });

  const simplyfyMember = (member) => {
    const newMember = member.map((item) => {
      return item.id;
    });
    return newMember;
  };

  const addItem = async () => {
    const token = await SecureStore.getItemAsync("token");
    const res = await fetch(
      `http://localhost:3000/bill/${route.params.itemid.billId}/item/new`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newNeame,
          price: parseInt(newPrice),
          color: "#ffff",
          peopleId: simplyfyMember(members),
        }),
      }
    );
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      Alert.alert("Create Item in bill Success");
      navigation.goBack();
    } else {
      const err = await res.json();
      console.log(err);
    }
  };

  const eddititem = async () => {
    const token = await SecureStore.getItemAsync("token");
    const res = await fetch(
      `http://localhost:3000/bill/${itemid["billId"]}/item/${itemid["id"]}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newNeame,
          price: parseInt(newPrice),
          color: "#ffff",
          peopleId: simplyfyMember(members),
        }),
      }
    );
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      Alert.alert("Create Item in bill Success");
      navigation.goBack();
    } else {
      const err = await res.json();
      console.log(err);
    }
  };

  const deleteitem = async () => {
    const token = await SecureStore.getItemAsync("token");
    const res = await fetch(
      `http://localhost:3000/bill/${itemid["billId"]}/item/${itemid["id"]}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      Alert.alert("Delete Item in bill Success");
      navigation.goBack();
    } else {
      const err = await res.json();
      console.log(err);
    }
  };

  console.log("food is ", route.params);
  const { itemid, group, name, price } = route.params;

  const [newNeame, setNewname] = useState(name || "");
  const [newPrice, setNewprice] = useState(price);
  return (
    <View className="m-[20px]">
      <View className=" border-b-[0.25px] flex flex-row justify-between items-center py-1">
        <Text className="font-semibold">Name</Text>
        <TextInput
          value={newNeame}
          placeholder="Enter Name"
          className="p-2 rounded-lg w-28 h-8 ml-2"
          onChangeText={(e) => setNewname(e)}
        />
      </View>
      <View className=" border-b-[0.25px] flex flex-row justify-between items-center py-1">
        <Text className="font-semibold">Pice</Text>
        <TextInput
          value={newPrice.toString()}
          keyboardType="numeric"
          placeholder="Enter Pices"
          className="p-2 rounded-lg w-28 h-8 ml-2"
          onChangeText={(e) => setNewprice(e)}
        />
      </View>
      <View className=" max-h-[250px] h-[250px] mt-4 ">
        <Member
          data={members}
          stage="foodEdit"
          type="edit"
          group={group}
        ></Member>
        {itemid.id != "new" && (
          <TouchableOpacity
            className="flex bottom-0 flex-row w-full  bg-[#BB2727] h-[40px]   rounded-xl "
            onPress={() => deleteitem()}
          >
            <View className="p-2 justify-center">
              <FontAwesomeIcon
                icon={faTrashAlt}
                color="white"
                size={20}
              ></FontAwesomeIcon>
            </View>
            <Text className="text-center mx-[100px] mt-1 p-2 text-white font-semibold">
              Delete Food
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
