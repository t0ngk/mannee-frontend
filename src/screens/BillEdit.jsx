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
import * as SecureStore from "expo-secure-store";
import { useColor } from "../stores/colorContext";
import { TouchableOpacity } from "react-native-gesture-handler";


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
];

export default function BillAdd({ navigation, route }) {
  const { id } = route.params;
  const { color, updateColor } = useColor();
  const [name, setName] = useState("");

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity className="mx-5" onPress={() => editBill()}>
        <Text className="text-xl font-semibold">Edit</Text>
      </TouchableOpacity>
    ),
  });


  const editBill = async () => {
    const token = await SecureStore.getItemAsync("token");
    const res = await fetch(`http://172.20.10.2:3000/bill/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body:JSON.stringify({
        name: name,
        color: color
      })
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      Alert.alert("Edit Bill Success");
      navigation.goBack();
    } else {
      const err = await res.json();
      console.log(err);
    }
  }

  return (
    <>
      <View className="my-2 m-[20px] h-full">
        <View className="border-2 p-2 rounded-md border-[#CFCFCF]">
          <View className=" border-b-[0.25px] flex flex-row justify-between items-center py-1">
            <Text className="font-semibold">Name</Text>
            <TextInput
              placeholder="Enter Name"
              className="p-2 rounded-lg w-28 h-8 ml-2"
              onChangeText={(e) => setName(e)}
              value={name}
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
                  navigation.navigate("ColorPick", { page: "BillEdit" })
                }
              />
            </View>
          </View>
        </View>
        <View className=" max-h-[250px] h-[250px] mt-4 ">
          <Member
            data={Data}
            stage="edit"
            type="edit"
            memberType="delete"
          ></Member>
        </View>
      </View>
    </>
  );
}
