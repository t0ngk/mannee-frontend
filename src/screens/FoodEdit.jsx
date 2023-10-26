import { useState } from "react";
import { TextInput, View, Text, Alert } from "react-native";
import Member from "../components/Member";
import * as SecureStore from 'expo-secure-store';
import { TouchableOpacity } from "react-native-gesture-handler";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const Data = [
  {
    id: 1,
    name: "User1",
    img: "https://minio.haxter.ee/ctx-betterexperience-prd/uploads/images/221ddf5a-642b-4ace-b145-f9426ab2ad03_original.jpg",
  },
  {
    id: 2,
    name: "User2",
    img: "https://play-lh.googleusercontent.com/cShys-AmJ93dB0SV8kE6Fl5eSaf4-qMMZdwEDKI5VEmKAXfzOqbiaeAsqqrEBCTdIEs",
  },
  {
    id: 3,
    name: "User3",
    img: "https://play-lh.googleusercontent.com/cShys-AmJ93dB0SV8kE6Fl5eSaf4-qMMZdwEDKI5VEmKAXfzOqbiaeAsqqrEBCTdIEs",
  },
  {
    id: 4,
    name: "User4",
    img: "https://play-lh.googleusercontent.com/cShys-AmJ93dB0SV8kE6Fl5eSaf4-qMMZdwEDKI5VEmKAXfzOqbiaeAsqqrEBCTdIEs",
  },
];
export default function FoodEdit({ route, navigation }) {

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity className="mx-5" onPress={() => eddititem()}>
        <Text className="text-xl font-semibold">Edit</Text>
      </TouchableOpacity>
    ),
  });


  const eddititem = async () => {
    const token = await SecureStore.getItemAsync("token");
    const res = await fetch(`http://172.20.10.2:3000/bill/${itemid['billId']}/item/${itemid['id']}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
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
      navigation.goBack();
    }
    else {
      const err = await res.json();
      console.log(err);
    }
  }

  const deleteitem = async () => {

    const token = await SecureStore.getItemAsync("token");
    const res = await fetch(`http://172.20.10.2:3000/bill/${itemid['billId']}/item/${itemid['id']}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      Alert.alert("Delete Item in bill Success");
      navigation.goBack();
    }
    else {
      const err = await res.json();
      console.log(err);
    }
  }

  console.log("food is ", route.params);
  const { itemid } = route.params;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
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
        <Member
          data={Data}
          stage="foodEdit"
          type="edit"
          memberType="add"
        ></Member>
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
      </View>
    </View>
  );
}
