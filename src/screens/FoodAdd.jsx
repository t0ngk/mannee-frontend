import { useState } from "react";
import { TextInput, View, Text } from "react-native";
import Member from "../components/Member";

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
export default function FoodAdd({}) {
  const [name, setName] = useState("");
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
      <View className=" max-h-[250px] h-[250px] mt-4 ">
        <Member data={Data} stage="add" type="edit" memberType="add"></Member>
      </View>
    </View>
  );
}
